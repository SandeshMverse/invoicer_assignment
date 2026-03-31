export const saveAuth = (data: any) => {
    localStorage.setItem("auth", JSON.stringify(data));
};

export const loadAuth = () => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : undefined;
};

export const clearAuth = () => {
    localStorage.removeItem("auth");
};