export const navigateToMenu = (
    setMessages,
    userText,
    showMenu
) => {

    setMessages(prev => [
        ...prev,
        {
            role: "user",
            text: userText
        }
    ]);

    showMenu();

};