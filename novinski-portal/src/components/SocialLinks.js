import { makeStyles } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'

const useStyles = makeStyles({
    social__a: {
        margin: '0 10px',
    },
})

const SocialLinks = ({ headerClass }) => {
    const classes = useStyles()
    return (
        <div className={headerClass ? 'social-header' : ''}>
            <a
                className={classes.social__a}
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
            >
                <FacebookIcon color="primary" />
            </a>
            <a
                className={classes.social__a}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
            >
                <InstagramIcon color="primary" />
            </a>
            <a
                className={classes.social__a}
                href="https://www.twitter.com/"
                target="_blank"
                rel="noreferrer"
            >
                <TwitterIcon color="primary" />
            </a>
        </div>
    )
}
export default SocialLinks
