import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { axiosInstance as axios } from '../util/axios-instance'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        display: 'flex',
        placeContent: 'center space-between',
    },
    wrapperHorizontal: {
        display: 'flex',
        placeContent: 'center center',
        fontFamily: 'Libre Franklin, san serif',
        color: '#333333',
    },
    wrapperMobile: {
        fontFamily: 'Libre Franklin, san serif',
        color: '#333333',
    },
    wrapperFooter: {
        display: 'flex',
        placeContent: 'center space-around',
        fontFamily: 'Libre Franklin, san serif',
        color: '#333333',
        '@media(max-width: 767px)': {
            placeContent: 'center center',
        },
    },
    // only for footer
    first: {
        borderRight: '1px solid #666666',
        paddingRight: '1rem',
    },
    second: {
        paddingLeft: '1rem',
    },
    navHorizontal: {
        display: 'flex',
        placeContent: 'center center',
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    navMobile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },

    navFooter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        textAlign: 'left',
    },
    liHorizontal: { marginRight: 0 },
    liMobile: { margin: '0.5rem auto' },
    liFooter: {
        alignSelf: 'baseline',
    },

    linkHorizontal: {
        color: '#333333',
        textDecoration: 'none',
        padding: '10px',
        margin: '1rem 0',
        fontWeight: 'bold',
    },
    linkMobile: {
        color: '#333333',
        textDecoration: 'none',
        fontSize: '1rem',
    },
}))

const CategoryList = ({ isMobile, handleDrawer, isFooter }) => {
    const classes = useStyles()

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get(`/category/getCategoryNames`)
            setCategories(res.data.categorys)
        }
        fetchCategories()
    }, [])

    const half = Math.ceil(categories.length / 2)

    let nav
    const link = isMobile ? classes.linkMobile : classes.linkHorizontal

    if (isMobile) nav = classes.navMobile
    else if (isFooter) nav = classes.navFooter
    else nav = classes.navHorizontal

    let wrapper

    if (isMobile) wrapper = classes.wrapperMobile
    else if (isFooter) wrapper = classes.wrapperFooter
    else wrapper = classes.wrapperHorizontal

    let li

    if (isMobile) li = classes.liMobile
    else if (isFooter) li = classes.liFooter
    else li = classes.liHorizontal

    let first = isFooter ? classes.first : ''
    let second = isFooter ? classes.second : ''

    return (
        <div className={wrapper}>
            <div className={first}>
                <ul className={nav}>
                    {categories.slice(0, half).map((el) => (
                        <li className={li} key={el._id}>
                            <Link
                                to={`/category/${el.name}/${el._id}`}
                                className={link}
                                onClick={handleDrawer}
                            >
                                <FormattedMessage
                                    id={el.name}
                                    default="default text"
                                ></FormattedMessage>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={second}>
                <ul className={nav}>
                    {categories.slice(-half).map((el) => (
                        <li className={li} key={el._id}>
                            <Link
                                to={`/category/${el.name}/${el._id}`}
                                className={link}
                                onClick={handleDrawer}
                            >
                                {el.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
    //     <div className={wrapper}>
    //         <div className={first}>
    //             <ul className={nav}>
    //                 <li className={li}>
    //                     <Link to="/" className={link} onClick={handleDrawer}>
    //                         <FormattedMessage
    //                             id="navmenu.item1"
    //                             default="default text"
    //                         />
    //                     </Link>
    //                 </li>
    //                 <li className={li}>
    //                     <Link to="/" className={link} onClick={handleDrawer}>
    //                         <FormattedMessage
    //                             id="navmenu.item2"
    //                             default="default text"
    //                         />
    //                     </Link>
    //                 </li>
    //                 <li className={li}>
    //                     <Link to="/" className={link} onClick={handleDrawer}>
    //                         <FormattedMessage
    //                             id="navmenu.item3"
    //                             default="default text"
    //                         />
    //                     </Link>
    //                 </li>
    //                 <li className={li}>
    //                     <Link to="/" className={link} onClick={handleDrawer}>
    //                         <FormattedMessage
    //                             id="navmenu.item4"
    //                             default="default text"
    //                         />
    //                     </Link>
    //                 </li>
    //                 <li className={li}>
    //                     <Link to="/" className={link} onClick={handleDrawer}>
    //                         <FormattedMessage
    //                             id="navmenu.item5"
    //                             default="default text"
    //                         />
    //                     </Link>
    //                 </li>
    //             </ul>
    //         </div>

    //         <div className={second}>
    //             <ul className={nav}>
    //                 <li className={li}>
    //                     <Link to="/" className={link} onClick={handleDrawer}>
    //                         <FormattedMessage
    //                             id="navmenu.item6"
    //                             default="default text"
    //                         />
    //                     </Link>
    //                 </li>
    //                 <li className={li}>
    //                     <Link to="/" className={link} onClick={handleDrawer}>
    //                         <FormattedMessage
    //                             id="navmenu.item7"
    //                             default="default text"
    //                         />
    //                     </Link>
    //                 </li>
    //                 <li className={li}>
    //                     <Link to="/" className={link} onClick={handleDrawer}>
    //                         <FormattedMessage
    //                             id="navmenu.item8"
    //                             default="default text"
    //                         />
    //                     </Link>
    //                 </li>
    //                 <li className={li}>
    //                     <Link to="/" className={link} onClick={handleDrawer}>
    //                         <FormattedMessage
    //                             id="navmenu.item9"
    //                             default="default text"
    //                         />
    //                     </Link>
    //                 </li>
    //                 <li className={li}>
    //                     <Link to="/" className={link} onClick={handleDrawer}>
    //                         <FormattedMessage
    //                             id="navmenu.item10"
    //                             default="default text"
    //                         />
    //                     </Link>
    //                 </li>
    //             </ul>
    //         </div>
    //     </div>
    // )
}

export default CategoryList
