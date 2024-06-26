import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import {Wrapper as PopperWrapper} from '../../Popper';
import styles from './Menu.module.scss';
import MenuItem from "./MenuItem";

const cx = classNames.bind(styles)

function Menu({children, items = []}) {
    const renderItems = () => {
        return items.map((item, index) => (
            <MenuItem key={index} data={item}/>
        ))
    }

    return (
        <div>
            <Tippy
                interactive={true}
                placement='bottom-end'
                render={attrs => (
                    <div className={cx('content')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {renderItems()}
                        </PopperWrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    )
}

export default Menu;