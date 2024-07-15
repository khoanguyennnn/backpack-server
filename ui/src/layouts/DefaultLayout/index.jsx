import classNames from "classnames/bind";

import styles from './DefaultLayout.module.scss';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <>  
            <div className={cx("wrapper")}>
                <Header/>
                <div className={cx("container")}>
                    {children}
                </div>
                <Footer/>
                <Navigation/>
            </div>
        </>
    )
}

export default DefaultLayout;