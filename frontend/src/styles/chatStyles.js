export const C = {
    bg: "#FAF6F1",
    surface: "#FFFFFF",
    border: "#E8DDD3",
    accent: "#6B3F1F",
    accentMid: "#9B6240",
    accentSoft: "#F0E6D9",
    userBubble: "#6B3F1F",
    userText: "#FAF6F1",
    botText: "#2C1810",
    muted: "#A08070",
    online: "#5A8A5A",
};

export const s = {

    wrap: {
        display: "flex",
        flexDirection: "column",
        height: "92vh",
        background: C.surface,
        borderRadius: "20px",
        overflow: "hidden",
        border: `1px solid ${C.border}`,
    },

    header: {
        padding: "14px 18px",
        borderBottom: `1px solid ${C.border}`,
        background: C.surface,
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },

    headerAvatar: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: C.accentSoft,
        border: `1.5px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: C.accentMid,
        flexShrink: 0,
    },

    headerTitle: {
        fontSize: "15px",
        fontWeight: 700,
        color: C.botText,
    },

    headerSub: {
        fontSize: "11.5px",
        color: C.muted,
    },

    onlineDot: {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: C.online,
        marginLeft: "auto",
    },

    body: {
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: C.bg,
    },

    rowBot: {
        display: "flex",
        gap: "8px",
        alignItems: "flex-end",
    },

    rowUser: {
        display: "flex",
        flexDirection: "row-reverse",
        gap: "8px",
        alignItems: "flex-end",
    },

    avatarBot: {
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: C.accentSoft,
        border: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: C.accentMid,
    },

    avatarUser: {
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: C.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: C.userText,
    },

    bubbleBot: {
        maxWidth: "72%",
        padding: "9px 13px",
        borderRadius: "16px 16px 16px 4px",
        fontSize: "13.5px",
        lineHeight: 1.55,
        background: C.surface,
        color: C.botText,
        border: `1px solid ${C.border}`,
    },

    bubbleUser: {
        maxWidth: "72%",
        padding: "9px 13px",
        borderRadius: "16px 16px 4px 16px",
        fontSize: "13.5px",
        lineHeight: 1.55,
        background: C.userBubble,
        color: C.userText,
    },

    quickBar: {
        display: "flex",
        gap: "8px",
        padding: "10px 16px",
        background: C.surface,
        borderTop: `1px solid ${C.border}`,
        overflowX: "auto",
    },

    btnPrimary: {
        whiteSpace: "nowrap",
        padding: "7px 14px",
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        background: C.accent,
        color: C.userText,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontWeight: 600,
    },

    btnSecondary: {
        whiteSpace: "nowrap",
        padding: "7px 14px",
        borderRadius: "20px",
        border: `1px solid ${C.border}`,
        cursor: "pointer",
        background: C.accentSoft,
        color: C.accentMid,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontWeight: 600,
    },

    inputArea: {
        display: "flex",
        gap: "8px",
        alignItems: "center",
        padding: "10px 14px",
        background: C.surface,
        borderTop: `1px solid ${C.border}`,
    },

    input: {
        flex: 1,
        border: `1px solid ${C.border}`,
        borderRadius: "20px",
        padding: "8px 14px",
        background: C.bg,
        outline: "none",
    },

    sendBtn: {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        background: C.accent,
        color: C.userText,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
};