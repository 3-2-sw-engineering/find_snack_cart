// Jaesun


import { useNavigate } from 'react-router-dom';
import { Map } from "react-kakao-maps-sdk";
import { FormGroup, Checkbox, FormControlLabel, Chip } from '@mui/material';
import SearchBar from 'material-ui-search-bar';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/Report.css'
import { useState } from 'react';

function Manage() {
	const navigate = useNavigate();
	const [searchText, setsearchText] = useState("");
	const [location, setLocation] = useState({
		lat: 37.413294,
		lng: 126.79581
	});

	function viewBack() {
		navigate('../');
	}
	function handleDelete() { }

	function searchLocation() {
		if (searchText === "") { return }
		console.log(searchText)
	}

	const { kakao } = window;
	var ps = new kakao.maps.services.Places();

	function searchLocation() {
		if (searchText === "") { return }
		ps.keywordSearch(searchText, placesSearchCB);
	}

	function placesSearchCB (data, status) {
		if (status === kakao.maps.services.Status.OK) {
			setLocation({
				lat: data[0].y,
				lng: data[0].x
			})
		} 
	}
	
	return (
		<div className="report-layout" >

			<div className="title"> 내 가게 관리하기</div>


			<div className="label">
				*표시된 항목은 필수입력 항목입니다.
			</div>

			<div className="item">
				<div className="info">가게 이름 *</div>
				<div className="content">
					<input className="input" />
				</div>
			</div>

			<div className="item">
				<div className="info">카테고리 *</div>
				<div className="content">
					<input className="input" />
					<div className="categories">
						<div className="chip" >
							<Chip label="붕어빵/잉어빵" color="secondary" onDelete={handleDelete} />
						</div>
						<div className="chip" >
							<Chip label="타코야끼" color="secondary" onDelete={handleDelete} />
						</div>
						<div className="chip" >
							<Chip label="기타" color="secondary" onDelete={handleDelete} />
						</div>
					</div>
				</div>
			</div>

			<div className="item">
				<div className="info">가게 위치*</div>
				<div className="content">
					<div className="map-container">
						<SearchBar
							value={searchText}
							onChange={(text) => setsearchText(text)}
							closeIcon={<SearchIcon />}
							onCancelSearch={searchLocation}
							onRequestSearch={searchLocation}
						/>
						<Map className="map" center={location} level={7}></Map>
					</div>
					<div className="locations">
						<div className="chip">
							<Chip label="서울특별시 동대문구 서울시립대로 163" color="info" onDelete={handleDelete} /></div>
						<div className="chip">
							<Chip label="서울특별시 마포구 ㅁㅇㄴㄻㅇㄹ" color="info" onDelete={handleDelete} /></div>
						<div className="chip">
							<Chip label="제주특별자치도 서귀포시 ㅁㄴㄻㄴㅇ" color="info" onDelete={handleDelete} /></div>

					</div>

				</div>
			</div>

			<div className="item">
				<div className="info">연락처</div>
				<div className="content">
					<input className="input" />
				</div>
			</div>


			<div className="item">
				<div className="info">가게 설명</div>
				<div className="content">
					<textarea className="description" rows="10" />
				</div>
			</div>

			<div className="item">
				<div className="info">결제 수단</div>
				<div className="content">
					<div className="payments">
						<FormGroup className="check-agree">
							<FormControlLabel control={<Checkbox defaultChecked />} label="현금" />
						</FormGroup>
						<FormGroup className="check-agree">
							<FormControlLabel control={<Checkbox defaultChecked />} label="카드" />
						</FormGroup>
						<FormGroup className="check-agree">
							<FormControlLabel control={<Checkbox defaultChecked />} label="계좌이체" />
						</FormGroup>
						<FormGroup className="check-agree">
							<FormControlLabel control={<Checkbox defaultChecked />} label="카카오페이" />
						</FormGroup>

					</div>
				</div>

			</div>

			<div className="item">
				<div className="info">가게 사진</div>
				<div className="content">
					<div className="image-uploader">
						사진 업로더

					</div>
				</div>
			</div>

			<div className="item">
				<div className="register-button"> 등록하기 </div>
			</div>
			<div className="item">
				<div className="delete-button"> 삭제하기 </div>
			</div>

		</div>
	);
}

export default Manage;