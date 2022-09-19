export const goToHomePage = (navigate) => {
    navigate("/")
}

export const goBack = (navigate) => {
    navigate(-1)
}

export const goToListTripPage = (navigate) => {
    navigate("/trips/list")
}

export const goToApplicationForm = (navigate) => {
    navigate("/trips/application")
}

export const goToLogin = (navigate) => {
    navigate("/login")
}

export const goToAdminHomePage = (navigate) => {
    navigate("/admin/trips/list")
}

export const goToAdminCreateTrip = (navigate) => {
    navigate("/admin/trips/create")
}

export const goToAdminTripDetail = (navigate, id) => {
    navigate(`/admin/trips/${id}`)
}