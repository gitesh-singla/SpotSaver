const logout = (req, res) => {
    res.cookie('authToken', '').json('Logged out.');
}

module.exports = logout;