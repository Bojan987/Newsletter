import React from 'react'

import Drawer from '@material-ui/core/Drawer'

import MobileAccordion from '../../MobileAccordion'
import LocationInfo from '../../LocationInfo'

import LanguageBox from '../../LanguageBox'
import SocialLinks from '../../SocialLinks'
import HeaderSearch from './HeaderSearch'
import LoginButton from './LoginButton'

const HeaderDrawer = ({ isDrawer, setIsDrawer, handleDrawer }) => {
    return (
        <Drawer
            id='header-drawer'
            variant="temporary"
            anchor="left"
            open={isDrawer}
            onClose={() => setIsDrawer(false)}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <HeaderSearch />
            <LocationInfo />
            <div style={{ textAlign: 'center' }}>
                <LanguageBox />
            </div>
            <LoginButton cssId={true} />
            <MobileAccordion handleDrawer={handleDrawer} />
            <SocialLinks headerClass={true} />
        </Drawer>
    )
}

export default HeaderDrawer
