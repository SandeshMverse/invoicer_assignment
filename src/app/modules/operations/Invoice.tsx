import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
// import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import { InvoiceItem } from "./invoiceTypes";
import InvoiceSummary from "./InvoiceSummary";
import { fetchProducts } from "./invoiceService";
import InvoiceTable from "../../shared/components/table/InvoiceTable";

const Invoice: React.FC = () => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const items = await fetchProducts();
        setInvoiceItems(items);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch products.");
      }
    };
    loadProducts();
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    const updatedItems = invoiceItems.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );

    const hasDiscount2Active = updatedItems.some(
      (item) => item.discount == 2 && item.quantity > 0,
    );

    let finalItems = updatedItems.map((item) => {
      let amount = item.price * item.quantity;

      switch (item.discount) {
        case 1:
          amount = item.price * Math.ceil(item.quantity / 2);
          break;
        case 3:
          const freeItems = Math.floor(item.quantity / 3);
          amount = item.price * (item.quantity - freeItems);
          break;
      }

      return { ...item, amount };
    });

    if (hasDiscount2Active) {
      finalItems = finalItems.map((item) => {
        if (item.name.toLowerCase().includes("bread")) {
          return { ...item, amount: item.amount / 2 };
        }
        return item;
      });
    }

    const total = finalItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discountTotal = finalItems.reduce(
      (sum, i) => sum + i.price * i.quantity - i.amount,
      0,
    );
    const final = finalItems.reduce((sum, i) => sum + i.amount, 0);

    setInvoiceItems(finalItems);
    setTotalAmount(total);
    setDiscountAmount(discountTotal);
    setFinalAmount(final);
  };

  const logoBase64 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAACFCAYAAAB1065QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAEHtJREFUeNrsnUFy2zYUhp872Vc9QZUTVJnpthPpBLZPYHnVZewTWD6B7WVXlk9g5wRmptvORD2BlRNEPUFKxGCtygREkQAIQN83w3FjVxQAgvjxHh4eRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBbDmIv4O9//jUsf6hrXF4/6/8elNfI8rFVeS30z7/1fy/++O3XJY8cACBTAdGCcVRe77VoDBzeXglKUV4f1U8EBQAgcQEpRUNZEydaOIYBv1pZJnfl9YCYAAAkIiDa0phq4RhG0BbKMrkpheSBbgEAEKGAlMIx1qIxjbRNlCVyWQrJnO4BABCBgGg31ZU8r2ukgBKS01JICroJAEAPAlIKh1oEvyivs0Tb6EELyYruAgAQSEBK8VCL4rfiNpKqD1ZaRFgfAQDwKSDa6lDCcZRZe12XInJOtwEA8CAgepH8PgOrw0RRXse4tAAAAXErHlNteeSO2j8yQUQAAAFxIx5KOKZ71HaICADsNT84Eo+zPRMPhQpLftTrPQAACEgL8RjL8/6OfeS7iNCNAAABacftnrfhSLvvAAAQkB2sj6nEkceqb6a6LQAAEJCGHNKE/3GlE0QCACAgDRjThP9RbZ4EAEBAGg6asCaoOn0LAAACkjjVCYTVFWLPxhWhvQCwD7xxMEDHNFiq8qiEh9WRta8EQ69TjOX5TJKxhzKo+6t9MTO6FwDkTKed6OVg/ChxrIMsy+tSno+mXe1QflX2Cw91UGV4yy51AMiZri6sj5HUQ6Van+86YKvDosprUv6n6wy7yiqb0r0AAAExE8v5GMsuHy5F5Lr8MRG3ayQf6F4AgICYB141cM/7roQuR9d7FI5FZMjmQgBAQOxc5tIYpYioDLunDm95QhcDAATEPvvv85S+hWMReXAoimpfyIhuBgAIiHnQVWsI857q4DzSqazPzKEwsRYCAAjIlkH3VCJYD3GIK6uKnekAgIA0FJHQayKffNxUL6oXDm41IL0JACAgzQbeWfnjbSbWiCsxJGsxACAgDUVkqa2Rn+Q5qulSXz5Exdtub22FLB3cCgsEALLjIOSX6X0RrlOeT/RA76vM6rjeMwe3eqfDhAEAsEBaMEywje4c3WdMdwMABKQ9v3i4p9eEhdpqcPEd7+luAICAtMd56vdAbqECCwQAoF8BSXVX9t8uxJMz0wEAAYnHAlkGKnfh6D6kNQEABGRXPOWECiUgrr4HAQEABCQC6yMYLtLFa36mywEAArI7w4QtEMUi0jYAAEBAWvAlYPlXkbYBAED2AgIICAAgIK3wsZFuFbD8S7oLAEA+FkjI3FJf6C4AAP0IyJDm/h7OPKYVAAAB6V9AVjxCAID8BcQ5pEcHAMhcQMgBBQCAgLQFAQEAQECioQj8fa7OMlnS7QAAAdkvnOTycphXCwBgLwRkQFMDACAgbfCRxpwILACAHnmTcNn/Cfx9Ywf3KOhysMaRYXI1a3Gvob7XQP4ftKImWsuAEy713dOa36syzFvcz9QWag/YdcBnNdvx99uYyuvgogePz2mk+5u4rMcb3mGA3vhgmJi0FZB7y98ngSYwqhwXhslTGwG5sPxt1fKe4rAcbQXkxPDsF56eyaOYlxJO29445UX0YLvQHZ6miNsN+uJW8luLvBLWV7cx0BMLm3i0FuFQAuLjJL5F4Ifggn/oz9ATwy2z+VQHx1serbV9lOUx8iEeIQVkmPiDwAKBHDgTN2t5MXEkdt8+4lHPpThw/7EPJKwFgoBA3+ToysqxTj7FQwnHzMUXpSwgIQdjJ4dhsYkQImCoLZHcBkxcWS/cbxGPU1dflKyAlIPxKvBL15WCfg2RcCF+9mb1Ca6sF2tsHEI8QgpIsubl73/+NXAkIJ/o2xDZQJNjnQZ7/kynocQjpIC4nu2EtD5YQIccUf16lmjZV5aJ6hXiUTv2nPr40lRdWCEH47Gj+xSMWdADhaXvperKUu+/aRf6VPKLNOsqHhNfX0wU1nYOXbzEgddsANY5tczaU3VlqTDUpaVO++LKmjUQD29jDwJiQa9/uJihfaQ1oUeWesCtI1VXlhoUzw1/G0p+myZN1tZFX+KRsoAsA32Pq6iOgjEMeuba0g8/SJqbfR/0VUeOmyY3xeO2T/EIIiAO80it8yXQQzpxIXZ//PYrC+hxoV68b2vX2Z7U2+TKSnkfxTb3XI6uLJt4rLa0SXIWSJIPsBS+oaMZjGmGNI64bUaStw95mEMfbWm531j6Y4pCWg2Ypuecmytrm3hMJGCQEWsgZj44us9NzeD8JM+pBtTPmDY/qYH0s76+inlxDtJlZhlgLgRXVsyMYhKPlAXEayPpxXMXg+eiJn3Jur95ENkMaSr/DxogPUSenFomEDm6snLYGzLSk85oxCNlAfHt3zsTN26NG8NLavt33xYI5I8aaExRWWPJz5WV8qbJdfEYxCQeoQQkKZNYWx8fHHXoOrP6bsu/+2S+Ic67HBmq3F7VojTEz0zsrqwUJxPqfSssdUpx06RNPBTn0mOWCwTE38vzYNg8qDr5Wz0DnEQ2M1qW1zvdKY/FHGdfZ7nklpxvH9g3V1ZqddomHp0PhEpBQHwNdD6sj5FD8/1yS/lnEuf+kKW2PB52+AxZUNPE5spKNbvtUvLYNFmJeLTikayAeDxXw9Vi23zPzv44FEiVmeSXEsS2aTIFV9a2A6FWsUw+CeN9sT5chvvd7VnzjelBSUNUVjriEdVzCSEg72PvaXrToKtwWpU4sZD9YeZ5ljqUl8igmbwkjxsLUWOuKMQcMJGjK6vqT7HxYwPxWK/DrO8Cv0m0Y7jm3uFgdNlgwL3YeHl3Sbdc7VE5lPod42rW1SQqQ/0/5zWd8rFB2Qb6BfxgaLdvW9pnW8c/0vU7avBcVD1UuPQcHejcb4+kPujlVveF1DJKX+t+VGchq3fwQcLl1WvCrqJ2IfZ0/QiIbwEprY8rcecTnXu2PmaWQXt9cB97fgZfe6zfJtXu3EMJmAMoQ6p9FI+GPnUlng4l8oyaJH021OlWPJ6V4ZC5Lu+RQdzf9dXv93oNpBSPqWNT9tJjcW8l3fj8phx2qN+R7O9pdK4oJL+DmlLfNDnXwn1qmDwPpcf1kBACEmXEgw7ZdTngXHqMvJrJ69QqS92p1J6SA3290y/LytARL/VnJh1nk5O163zL3zevueW+N4aXf7JWz58s90l1kIuJHA9qmkma+b8e1t5T2077I+kpb10IF1Z0HU6Lx6PDsi1lt13buzCU1wv8c0NnWsjLcZ91i3EzhzPVLn+3vTCVb/rGMJBVIYzq+lQz+zoRzl/pQnVQ072lL54nWC/1vqTkyqo7x7zQAl8X8HOl/74MWcgUXVifOorHtg06bTj3eGTtUY1YnTccBDZn57HPHlfa0jhv+CLMaywRLBA3M9/csttuc2UdRVZW04FQJmtqYBB9BMSh5dEkxnrnl60UjwePxT6sebmbiFVR09Fy3DF+VzNLBjcz9twOajINvjHVqclpgseGv7t2y/crIJ5OI4xJPGx+SVdsDoi7nK9e7MHgWjDWe7MGczyoKeZNkytpdhStzQsR1EL0bYFEMUvxJB7fO6NH15WLQf8fxkHoYl2L3ZWVYgLNao2wjr43Td5I83DcueXZuNzX1quA+GAZiXjMPbuuAGKZseeS3bYil0gzU2hvMGsq642EHqKt1mcxoSJRFhvit4tF8l7SZ6gvU8r4HxnjvVK5suoWaKvstrNE6/RoGXyPE6mHKudngzV1Jv6iQ4MIyLivli3FY+zJlPve+QK4rkwCciLN0nbU7UhPxWKayksKCvJd9U91UFPd+1yFXS8Sq1OhB9czw+A7ljTW16rosgvDsyl8Ppsso7B0Zl0flodCheyGfFnuakS5ye7Z2xrLLfaXXNXrqy77kSAeMYErK15mBrEb+K5HVgKi1jvKSzWYr1C261I85oGrVdRYDlfauhoZZk+P8noxMPY8RtVzG1jaoZo1Xm5c4J+l5HFQ0ytvguFvQ0kr0swk8COf9chmDUSvd9yKv8gQtWh+3mPnGG7UbT1ipBD7sbKnkZvj6rlNa17uubbAtllOqYaUpkaT7LapUeh+NjVYxB8lDVfWUsxrVaoen3w8n+QskLp8U2suK1/iEXLR3DRTmlg68thQ92qRbR7xIx3XvLyqvasd6an51nMn1YOabJxLHpsmHyzvupd6JO3C0i6r+y2uDxfiMQm4aG4TEVtH35xVVYkWY58VntT87liax8OzThJ+pmtLCfIhwTrl5MoypQHykuokWQHRqdifxO/Gn1jEQ7SFsR4YUM3S38pLpluVqfZAXrLVpnA2xnDj33PZba/PSCA0tjPHU02Xs23TZEpieGwReKd18S0ghQfhGJbXYwDTMibxGNSIx0QPtEt5WWBO8TCl8ca/v+z4+UPG895murmRy4FkNpe7ywP0vAuID//1k/jfXxKTeFSzunWxvJR8Tt7rUo+B5JkgMpVBKrcIuBC57WKwEp1Nvr0KiB6AFwm+GDGJh2LocNANIQCjHdt7nV92+OyVkH23T2aSX5CDzZWVGt6z9oZYAykS6zyxiUfsA+fCUL6mLGusrSYWZl3oL4TnNMM6NQ1WSdmimrqw3kMIyE0qJl8pHMeRisdDzQxCufK+yXMenEfLdSX+D5PaLJ8SgPsakRvW/O6u5n6PenY7qPn8ma771CJCEHYCkZsra5lRndS7eW2ZhHWaiHoXEL1vYx67Sve4SbDpS2rqBCM9YJuuM91RnsTfbuG6ScLRmshV11ON1VAYXAYqdPJrzec3ra/TjFwOqTKT/FxZtjWE1LgU8ymGndLQ/BCwArEOzJMe0pPsinrQf3ecaQ/0oOzj2MtCumX9PG0xAFXm+Vy3DfQLUVmRT5INfxt3mVgGERBthVxH1qhzLR6xz5zUTP6zC3Nz7X4+LJHzDi+c+sw7aR5d9qD///naRAD6pYjwHe/KUvJxZdlCey+kZWjvQajSezzYqZUa93gY1HBDCGyRatMaE1MNmjcNB82xvOwOHmx8508GK2XUsGzbRGpkGGSKDp9fiHm/y3jje2yMNtpjKf2so2yWo2n5pcGz6/oMxWEZupRj3HOdTGXo8qxMzz5EPxxbxHLn7z4I+bZ4POCpKd8zuSYQZVUJzdPG746lnb9/JK8PnZkI54kDQAeCpjLR7qImh8b7MK+Vu+o8EfGozMpN8WtrNS1qZmzkkAKAdASkBxFRJplyVynxSG22vWlqfux4v1WNhQMA0JqDvr5Y5bQS86FILoTjMoHoKhvfHD+rzxttjQsLANIUEC0iyo1SbXRzgRoQ7xIXDpOAvJX2C2xKrJ8c3g8AoF8BWRMSFXXTNsGXcs2otYGbBEJyu1gMKpxw1uI+ddFvqp3e0f0BIHkBWbNG1MJxk3z1lWh87DEc1zczeb2QruK4d4m1n+p7DDd+3zaaCwAgPgFZE5KhHvSmG3+q9gB8ylg0Ni2HJ6mPFb+Tl/WLyuqqLAzVfu/leRF+WHPfa8lz1zAA7LuAbFgk1aC4SCj81iWu9820dYMBAECCKCtCRat963C5SoMCAACJCslMWyTbBKM68ncqbBgEAE8c0ARJ8z83n+RzzC0AAAAAAAAAAAAAAAAAAAAAAAAAQOb8K8AAfqeFVNhAg7cAAAAASUVORK5CYII=";

  const downloadInvoice = () => {
    if (invoiceItems.filter((i) => i.quantity > 0).length === 0) {
      toast.error("Please add at least one product to the invoice.");
      return;
    }
    const doc = new jsPDF();
    const invoiceNumber = "INV_00" + Math.floor(Math.random() * 10000);
    doc.addImage(logoBase64, "PNG", 14, 10, 50, 15);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("2nd Floor, Office Suite 1", 14, 36);
    doc.text("Belmont Row, Birmingham B4 7RQ", 14, 42);

    doc.setFontSize(12);
    doc.text(`Invoice No: ${invoiceNumber}`, 150, 20);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 28);

    const tableData = invoiceItems
      .filter((i) => i.quantity > 0)
      .map((item, idx) => [
        idx + 1,
        item.name,
        item.quantity,
        `£${item.price.toFixed(2)}`,
        `£${item.amount.toFixed(2)}`,
      ]);

    autoTable(doc, {
      startY: 50,
      head: [["Sr", "Description", "Qty", "Price", "Amount"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [103, 195, 204],
        textColor: 255,
        fontStyle: "bold",
      },
      styles: { fontSize: 10, cellPadding: 3 },
    });

    const finalY = (doc as any).lastAutoTable?.finalY || 60;

    doc.setFontSize(12);
    doc.text(`Total Amount: £${totalAmount.toFixed(2)}`, 140, finalY + 10);
    doc.text(`Discount: £${discountAmount.toFixed(2)}`, 140, finalY + 18);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Payable: £${finalAmount.toFixed(2)}`, 140, finalY + 26);

    doc.save(`${invoiceNumber}.pdf`);
  };

  return (
    <div className="m-3">
      <h3 className="mb-3">Invoice</h3>
      <div className="row">
        <div className="col-md-8">
          <InvoiceTable
            items={invoiceItems}
            onQuantityChange={handleQuantityChange}
          />
        </div>
        <div className="col-md-4">
          <InvoiceSummary
            totalAmount={totalAmount}
            discountAmount={discountAmount}
            finalAmount={finalAmount}
            onDownload={downloadInvoice}
          />
        </div>
      </div>
    </div>
  );
};

export default Invoice;
