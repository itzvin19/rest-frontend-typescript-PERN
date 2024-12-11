export const formatCurrency = (ammount: number) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'PEN'
    }).format(ammount)
}

export const toBoolean = (str: string) => {
    if (str === 'true') {
        return true
    } else {
        return false
    }
}