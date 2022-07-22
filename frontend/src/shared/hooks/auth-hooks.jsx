import { useCallback, useState, useEffect, useMemo } from 'react'

let logoutTimer

export const useAuth = () => {
  const [ tokenExpirationDate, setTokenExpirationDate ] = useState()

  const login = useCallback((userId, token, expirationDate) => {
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 30)
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    )
  }, [])

  const logout = useCallback(() => {
    setTokenExpirationDate(null)
    localStorage.removeItem("userData")
  }, [setTokenExpirationDate])

  useEffect(() => {
    if(tokenExpirationDate) {
      const timeLeft = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, timeLeft)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [logout, tokenExpirationDate])

  const storedData = JSON.parse(localStorage.getItem("userData"))
  const {userId, token} = useMemo(() => {
    if(storedData && storedData.token && new Date(storedData.expiration) >  new Date()) {
      return {id: storedData.userId, token: storedData.token};
    }
    return {};
  }, [storedData]);

  return { userId, token, login, logout }
}