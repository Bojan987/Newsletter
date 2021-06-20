import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CardActionArea from '@material-ui/core/CardActionArea'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '1rem',
        alignItems: 'center',
    },
    media: {
        height: 60,
        width: 60,
        alignItem: 'center',
        marginRight: '2rem',
        marginLeft: 'auto',
    },
    postDetails: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        textAlign: 'left',
        alignItems: 'center',
    },
    postTitle: {
        padding: '2rem 0',
        marginLeft: '2rem',
        fontFamily: "'Bitter', serif",
        fontWeight: 600,
        textAlign: 'left',
        maxWidth: 200,

        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '50vw',
        },
    },
    time: {
        marginBottom: '1.5rem',
        marginLeft: '1rem',
        color: '#909090',
        width: 65,
    },
    tableHead: {
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #F2F2F2',
        padding: '1rem 5rem',
    },
}))

const LatestCell = styled(Typography)`
    cursor: pointer;
    font-family: 'Abel', sans-serif;
    font-size: 20px;
    ${(props) => (props.islatest ? 'color: black' : 'color: #909090')}
`

const MostReadCell = styled(Typography)`
    cursor: pointer;
    font-family: 'Abel', sans-serif;
    font-size: 20px;
    ${(props) => (props.islatest ? 'color: #909090' : 'color: black')}
`

const Latest = ({ categoryPosts }) => {
    const classes = useStyles()
    const [showLatest, setShowLatest] = useState(true)



    // const time = (published) => {
    //     const dateTime = published.split(' ')
    //     const dateArr = dateTime[0].split('-')
    //     const timeArr = dateTime[1].split(':')
    //     const dateTimeArr = [...dateArr, ...timeArr]
    //     const publishedDate = new Date(
    //         dateTimeArr[0],
    //         dateTimeArr[1] - 1,
    //         dateTimeArr[2],
    //         dateTimeArr[3],
    //         dateTimeArr[4],
    //         0,
    //         0
    //     )
    //     const currentDate = new Date()

    //     const hours = Math.floor(
    //         (currentDate.getTime() - publishedDate.getTime()) / 1000 / 60 / 60
    //     )
    //     return hours > 24 && Math.floor(hours % 24) !== 0
    //         ? `${Math.floor(hours / 24)}d ${Math.floor(hours % 24)}h`
    //         : hours > 24 && Math.floor(hours % 24) === 0
    //         ? `${Math.floor(hours / 24)}d`
    //         : `${hours}h`
    // }

    // const prettyDate2 =(time) => {
    //     const date = new Date(parseInt(time));
    // const localeSpecificTime = date.toLocaleTimeString();
    // return localeSpecificTime.replace(/:\d+ /, ' ');
    //     }

    // const dateConvert = (created) => {

    //     return new Date(created).toLocaleDateString('en-gb', {
    //         hour: 'numeric',
    //         minute: 'numeric',
    //     })
    // }

    return (
        <>
            <Paper>
                <Box className={classes.tableHead}>
                    <LatestCell
                        islatest={showLatest ? 1 : 0}
                        variant="h5"
                        onClick={() => setShowLatest(true)}
                    >
                        NAJNOVIJE
                    </LatestCell>
                    <MostReadCell
                        islatest={showLatest ? 1 : 0}
                        variant="h5"
                        onClick={() => setShowLatest(false)}
                    >
                        NAJCITANIJE
                    </MostReadCell>
                </Box>
            </Paper>
            <Card className={classes.root}>
                <>
                    {showLatest
                        ? categoryPosts
                              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                              .map((post) => {
                                  return (
                                      <CardActionArea
                                          key={post._id}
                                          component={Link}
                                          to={`/single-post/${post._id}`}
                                      >
                                          <Box className={classes.postDetails}>
                                              <Typography
                                                  variant="h5"
                                                  className={classes.time}
                                              >
                                                  {moment(post.updatedAt)
                                                      .startOf('hour')
                                                      .fromNow()}
                                              </Typography>
                                              <Typography
                                                  variant="h5"
                                                  color="primary"
                                                  className={classes.postTitle}
                                              >
                                                  {post.title}
                                              </Typography>

                                              <CardMedia
                                                  image={post.image}
                                                  title="Post image"
                                                  className={classes.media}
                                              />
                                          </Box>
                                      </CardActionArea>
                                  )
                              })
                              .slice(0, 8)
                        : categoryPosts
                              .sort((a, b) => b.visits - a.visits)
                              .map((post) => {
                                  return (
                                      <CardActionArea
                                          key={post._id}
                                          component={Link}
                                          to={`/single-post/${post._id}`}
                                      >
                                          
                                          <Box className={classes.postDetails}>
                                              <Typography
                                                  variant="h5"
                                                  className={classes.time}
                                              >
                                                  {post.visits}
                                              </Typography>
                                              <Typography
                                                  variant="h5"
                                                  color="primary"
                                                  className={classes.postTitle}
                                              >
                                                  {post.title.slice(0, 20)}...
                                              </Typography>

                                              <CardMedia
                                                  image={post.image}
                                                  title="Post image"
                                                  className={classes.media}
                                              />
                                          </Box>
                                      </CardActionArea>
                                  )
                              })
                              .slice(0, 8)}
                </>
            </Card>
        </>
    )
}

export default Latest
