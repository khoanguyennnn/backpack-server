import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import classNames from 'classnames/bind';

import * as userServices from '../../services/userServices';
import styles from './Profile.module.scss';
import logo from '../../assets/logo/logo.jpg';
import { UserContext } from '../../context/UserContext';

const cx = classNames.bind(styles);

function Profile() {
    const [userInfo, setUserInfo] = useState({});
    
    const [isNotFound, setIsNotFound] = useState(false);
    const [warningLog, setWarningLog] = useState('');

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const handleRegister = async () => {
        setWarningLog('');
        if (!email || !password) {
            setWarningLog('Email and Password is required!')
            return;
        }
        setShowLoading(true);
        let res = await userServices.registerApi(name, email, password, address);
        if (res && res.status === 200) {
            navigate('/login');
        } else if ( res && res.status !== 200){
            setIsNotFound(true);
            setWarningLog(res.data.message)
        }
        setShowLoading(false);
    }

    useEffect(() => {
        const fetchApi = async () => {
            const res = await userServices.userInfoApi();
            setUserInfo(res)
        }
        fetchApi();
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title')}>Account Information</div>
                <div className={cx('input-holder')}>
                    <div className={cx('text')}>Full Name</div>
                    <p className={cx('input-box')}>
                        {userInfo?.name}
                    </p>

                    <div className={cx('text')}>Email</div>
                    <p className={cx('input-box')}>
                            {userInfo?.email}
                    </p>

                    <div className={cx('text')}>Address</div>
                    <p className={cx('input-box')}>
                        {userInfo?.address}
                    </p>
                </div>
            </div>
            <div className={cx('logo-img')}>
                <img src={logo} alt={logo} />
            </div>
        </div>
    )
}

export default Profile;