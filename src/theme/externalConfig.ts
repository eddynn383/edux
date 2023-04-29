

export const configTheme = (theme:any) => {
    return {
        token: {
            colorBgBase: theme === "light" ? "#ffffff" : "#242424",
            colorText: theme === "light" ? "#181818" : "#ffffff",
            colorBorder: theme === "light" ? "#F0F2F4" : "#343738",
            colorBorderSecondary: theme === "light" ? "#F0F2F4" : "#343738",
            colorPrimaryBg: theme === "light" ? "rgba(0, 0, 0, 0.025)" : "rgba(255, 255, 255, 0.025)",
            colorPrimaryBgHover: theme === "light" ? "rgba(0, 0, 0, 0.033)" : "rgba(255, 255, 255, 0.033)",
            // colorFillAlter: theme === "light" ? "#F0F2F4" : "#2E2F30",
        },
    }
} 