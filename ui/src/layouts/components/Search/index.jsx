import { useEffect, useState, useRef } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark, faSpinner, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import {Wrapper as PopperWrapper} from '../../../components/Popper';
import ProductItem from '../../../components/ProductItem';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    useEffect(() => {
        if(!searchValue.trim()) {
            setSearchResult([])
            return;
        }

        setLoading(true)

        fetch(`http://localhost:3000/api/product/search?q=${encodeURIComponent(searchValue)}`)
            .then(res => res.json())
            .then(res => {
                setSearchResult(res);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    },[searchValue])

    const handleHideResult = () => {
        setShowResult(false);
    } 

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    return (
        <>
            <HeadlessTippy
                interactive
                visible = {showResult && searchResult.length > 0}
                render={attrs => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>
                                Products
                            </h4>
                            {searchResult.map(result => (
                                <ProductItem key={result._id} data={result}/>
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input 
                        ref={inputRef}
                        value={searchValue}
                        placeholder='Search'
                        spellCheck={false}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button 
                            className={cx('clear')} 
                            onClick={handleClear}
                        >
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner}/>}
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>
                </div>
            </HeadlessTippy>
        </>
    )
}

export default Search;