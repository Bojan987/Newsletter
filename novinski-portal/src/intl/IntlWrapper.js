import React, { createContext, useState } from 'react'
import { IntlProvider } from 'react-intl'
import Srpski from '../languages/sr-RS.json'
import English from '../languages/en-US.json'

//sr-RS
//en-US

export const LangContext = createContext()

// local is set to default manualy (can be set via other options)
const local = 'sr-RS'

let lang
if (local === 'sr-RS') {
    lang = Srpski
} else {
    lang = English
}

const IntlWrapper = (props) => {
    const [locale, setLocale] = useState(local)
    const [message, setMessage] = useState(lang)

    //handler set for select input with 2 options SR,EN
    const changeLangHandler = (e) => {
        const newLocale = e.target.value
        setLocale(newLocale)
        newLocale === 'sr-RS' ? setMessage(Srpski) : setMessage(English)
    }
    return (
        <LangContext.Provider value={{ locale, changeLangHandler}}>
            <IntlProvider locale={locale} messages={message}>
                {props.children}
            </IntlProvider>
        </LangContext.Provider>
    )
}

export default IntlWrapper


