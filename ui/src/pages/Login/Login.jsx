import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

import classNames from 'classnames/bind';

import * as userServices from '../../services/userServices';
import styles from './Login.module.scss';
import logo from '../../assets/logo/logo.jpg';
import { UserContext } from '../../context/UserContext';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    
    const [isNotFound, setIsNotFound] = useState(false);
    const [warningLog, setWarningLog] = useState('');

    const { loginContext, user } = useContext(UserContext);

    const handleLogin = async () => {
        setWarningLog('');
        if (!email || !password) {
            setWarningLog('Email and Password is required!')
            return;
        }
        setShowLoading(true);
        let res = await userServices.loginApi(email, password);
        if(res && res.data.accessToken){
            loginContext(email, res.data.accessToken, res.data.refreshToken);
        } else {
            // error
            if(res && (res.status !== 200)){
                setWarningLog(res.data.message);
                setIsNotFound(true);
            }
        }
        setShowLoading(true);
    }

    return (
        <div className={cx('wrapper')}>
            { user && user.auth && (
                <Navigate to="/" replace={true}/>
            )}
            <div className={cx('content')}>
                <div className={cx('title')}>Log in</div>
                <div className={cx('input-holder')}>
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
                            placeholder="Enter Password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <FontAwesomeIcon className={cx('eye-icon')} icon={isShowPassword === true ? faEye : faEyeSlash} onClick={() => setIsShowPassword(!isShowPassword)} />
                    </div>
                    <p className={cx('forgot-password')}>Forgot password?</p>
                </div>
                {
                    isNotFound &&
                    <div className={cx('not-found')}>
                        <div className={cx('not-found-text')}>{warningLog}</div>
                    </div>
                }
                <button
                    className={cx('btn-submit')}
                    disabled={email && password ? false : true}
                    type="submit"
                    onClick={() => handleLogin()}
                >
                    {showLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                    &nbsp;Login
                </button>

            </div>
            <div className={cx('logo-img')}>
                <img src={logo} alt={logo} />
            </div>
        </div>
    )
}

export default Login;