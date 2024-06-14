import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import classNames from 'classnames/bind';

import * as userServices from '../../services/userServices';
import styles from './Register.module.scss';
import logo from '../../assets/logo/logo.jpg';
import { UserContext } from '../../context/UserContext';

const cx = classNames.bind(styles);

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    
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

    return (
        <div className={cx('wrapper')}>
            { user && user.auth && (
                <Navigate to="/" replace={true}/>
            )}
            <div className={cx('content')}>
                <div className={cx('title')}>Sign up</div>
                <div className={cx('input-holder')}>
                    <div className={cx('text')}>Full Name</div>
                        <input
                            className={cx('input-box')}
                            type="text"
                            placeholder="Enter your Full Name"
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    <div className={cx('text')}>Email</div>
                    <input
                        className={cx('input-box')}
                        type="text"
                        placeholder="Enter Email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <div className={cx('text')}>Password</div>
                    <div className={cx('input-psw')}>
                        <input
                            className={cx('input-box')}
                            type= {isShowPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <FontAwesomeIcon className={cx('eye-icon')} icon={isShowPassword === true ? faEye : faEyeSlash} onClick={() => setIsShowPassword(!isShowPassword)} />
                    </div>
                    <div className={cx('text')}>Address</div>
                    <input
                        className={cx('input-box')}
                        type="text"
                        placeholder="Enter your Address"
                        required
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </div>
                {
                    isNotFound &&
                    <div className={cx('not-found')}>
                        <div className={cx('not-found-text')}>{warningLog}</div>
                    </div>
                }
                <button
                    className={cx('btn-submit')}
                    disabled={email && password && name && address ? false : true}
                    type="submit"
                    onClick={() => handleRegister()}
                >
                    {showLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                    &nbsp;Register
                </button>

            </div>
            <div className={cx('logo-img')}>
                <img src={logo} alt={logo} />
            </div>
        </div>
    )
}

export default Register;