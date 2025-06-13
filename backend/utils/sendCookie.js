export const sendCookie = (token, res) => {
    res.cookie('token',token,{
        secure : true,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
        sameSite : 'None' 
    })
}