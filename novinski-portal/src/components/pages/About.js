import React, {useState, useEffect} from 'react'
import Title from '../Cards/Title'
import SectionAboutInfo from '../Sections/SectionAboutInfo'
import SectionAboutTeam from '../Sections/SectionAboutTeam'
import styled from 'styled-components'
import { axiosInstance as axios } from '../../util/axios-instance' 

const AboutTitle = styled.h1`
    color: #231f20;
    font-family: 'Bitter', serif;
    font-weight: 600;
    text-align: center;
    font-size: 40px;
    padding: 20px 0;
`

const About = () => {
    const [team, setTeam] = useState([]);

    const getTeam = async () => {
        const response = await axios.get('/user/getOurTeam');
        const j = response.data.journalists.map(user => user).slice(0,3);
        const m = response.data.managers.map(user => user).slice(0,3);
        setTeam(j.concat(m))
    }

    useEffect(() => {
        getTeam()
    }, [])

    return (
        <div>
            <Title title="title.about" />
            <SectionAboutInfo />
            <AboutTitle>NAŠ TIM</AboutTitle>
            <SectionAboutTeam team={team} />
        </div>
    )
}

export default About
