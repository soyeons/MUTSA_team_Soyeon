import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { festivals } from '../atom';

const Wrapper = styled.div`
	background-color: #ffc600;
	box-shadow: 0.1rem 0.1rem 0.5rem rgb(161, 161, 161);
	border-radius: 1rem;
	position: relative;
	width: 18rem;
	height: 25rem;
	text-decoration: none;
`;

const Content = styled.div`
	background-color: white;
	color: black;
	box-shadow: 0.1rem 0.1rem 0.5rem rgb(161, 161, 161);
	border-radius: 1rem;
	position: relative;
	top: 1rem;
	right: 1rem;
	width: 18rem;
	height: 23.5rem;
	text-align: center;
	padding: 0rem;
	padding-top: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	line-height: 150%;
	text-decoration: none;
	img {
		padding-top: 1rem;
		padding-bottom: 0.5rem;
		object-fit: contain;
		width: 12rem;
	}
`;
const Title = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	padding-bottom: 0.5rem;
	text-align: center;
	text-decoration: none;
`;

function Festival({ festivalId }) {
	const festivallist = useRecoilValue(festivals);
	const festival = festivallist.filter((festival) => festival.id === festivalId)[0];

	let date = '날짜미정';
	const start = new Date(Number(festival.time_start.substring(0, 4)), Number(festival.time_start.substring(5, 7)) - 1, Number(festival.time_start.substring(8, 10)));
	const end = new Date(Number(festival.time_end.substring(0, 4)), Number(festival.time_end.substring(5, 7)) - 1, Number(festival.time_end.substring(8, 10)));
	const startYear = start.getFullYear();
	const endYear = end.getFullYear();
	const startMonth = start.getMonth() + 1;
	const endMonth = end.getMonth() + 1;
	const startDate = start.getDate();
	const endDate = end.getDate();
	const subDate = endDate - startDate;
	if (subDate === 0) {
		date = `${startYear}.${startMonth}.${startDate}`;
	} else {
		date = `${startYear}.${startMonth}.${startDate} ~ ${endYear}.${endMonth}.${endDate}`;
	}

	return (
		<>
			<Link to={`/detail/${festival.id}`} style={{ 'text-decoration': 'none' }}>
				<Wrapper>
					<Content>
						<img src={festival.Poster} alt={festival.id}></img>
						<div>
							<Title>{festival.title}</Title>
							<div>{date}</div>
						</div>
					</Content>
				</Wrapper>
			</Link>
		</>
	);
}

export default Festival;
