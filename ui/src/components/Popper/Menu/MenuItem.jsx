import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './Menu.module.scss';

const cx = classNames.bind(styles)

function MenuItem({data}) {
    const handleAction = () => {
        if(data.action) {
            data.action()
        }
        return;
    }

    return (
        <Link to={data.to} className={cx('wrapper')}>
            <button className={cx('btn')} onClick={() => {handleAction()}}>
                <span className={cx('btn-icon')}>{data.icon}</span>
                <span className={cx('btn-title')}>{data.title}</span>
            </button>
        </Link>
    )
}

export default MenuItem;