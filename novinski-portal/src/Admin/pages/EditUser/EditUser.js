import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import EditUserForm from '../CreateUser/UserForm/EditUserForm'
import ProfileCard from '../../../components/Cards/ProfileCard'
import { axiosAuth as axios } from '../../../util/axios-instance'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    profileContainer: {
        width: '70%',
        '@media(max-width: 1000px)': {
            width: '100%',
        },
    },
}))

const EditUser = () => {
    const classes = useStyles()
    const [user, setUser] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)
    const [infoMsg, setInfoMsg] = React.useState('')
    const [socialMsg, setSocialMsg] = React.useState('')
    const [passwordMsg, setPasswordMsg] = React.useState('')

    let id = useParams()

    const handleUser = (user) => {
        setUser(user)
    }

    const infoFormik = useCallback(
        (values) => {
            let userObj = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                accountStatus: values.accountStatus,
                role: values.role,
                position: values.position,
                country: values.country,
                city: values.city,
                address: values.address,
                phone: values.phone,
                age: values.age,
            }

            axios.put(`/user/editUser/${user._id}`, userObj).then((data) => {
                setInfoMsg(data.data.message)
            })
            setTimeout(() => {
                setInfoMsg('')
            }, 3000)
        },
        [user._id]
    )

    const socialFormik = useCallback(
        (values) => {
            let socialAccounts = [
                { name: 'facebook', link: values.facebook },
                { name: 'instagram', link: values.instagram },
                { name: 'twitter', link: values.twitter },
                { name: 'linkedin', link: values.linkedin },
            ]

            axios
                .put(`/user/editSocial/${user._id}`, {
                    socialAccounts: socialAccounts,
                })
                .then((data) => {
                    setSocialMsg(data.data.message)
                })

            setTimeout(() => {
                setSocialMsg('')
            }, 3000)
        },
        [user._id]
    )

    const passwordFormik = useCallback((values) => {
        if (values.password !== values.repeatPassword) {
            alert('Passwords do NOT match!')
            return
        }

        axios
            .post(`/user/changePassword/${user._id}`, {
                newPassword: values.password,
                newPasswordAgain: values.repeatPassword,
            })
            .then((data) => {
                setPasswordMsg(data.data.message)
            })
        setTimeout(() => {
            setPasswordMsg('')
        }, 3000)
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        setIsLoading(true)
        axios
            .get(`/user/getSingleUser/${id.id}`)
            .then((data) => {
                handleUser(data.data.user)
            })
            .then(() => {
                setIsLoading(false)
            })
        // eslint-disable-next-line
    }, [infoFormik, socialFormik])

    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <div className={classes.root}>
                    <div className={classes.profileContainer}>
                        <ProfileCard size="big" isAdmin={true} data={user} />
                    </div>
                    <EditUserForm
                        user={user}
                        infoFormik={infoFormik}
                        passwordFormik={passwordFormik}
                        socialFormik={socialFormik}
                        infoMsg={infoMsg}
                        socialMsg={socialMsg}
                        passwordMsg={passwordMsg}
                    />
                </div>
            )}
        </>
    )
}

export default EditUser
