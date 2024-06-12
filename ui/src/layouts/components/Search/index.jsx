import { useEffect, useState, useRef } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark, faSpinner, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import * as searchServices from '../../../services/searchServices';
import {useDebounce} from '../../../hooks';
import {Wrapper as PopperWrapper} from '../../../components/Popper';
import ProductItem from '../../../components/ProductItem';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef()

    useEffect(() => {
        if(!debounced.trim()) {
            setSearchResult([])
            return;
        }

        
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced);
            setSearchResult(result);
            setLoading(false);
        }

        fetchApi();
    },[debounced])

    const handelChange = (e) => {
        const searchValue = e.target.value
        if(!searchValue.startsWith(' ')){
            setSearchValue(searchValue)
        }
    }

    const handleHideResult = () => {
        setShowResult(false);
    } 

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleOnHideClick = () => {
        setSearchValue('');
        setSearchResult([]);
        setShowResult(false);
    };

    return (
        <>
            <div className={cx('search-wrapper')}>
                <HeadlessTippy
                    interactive
                    visible = {showResult && searchResult.length > 0}
                    render={attrs => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>
                                    Products
                                </h4>
                                <div className={cx('search-body')} onClick={handleOnHideClick}>
                                    {searchResult.map(result => (
                                        <ProductItem key={result._id} data={result}/>
                                    ))}
                                </div>
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
                            onChange={handelChange}
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
                        <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </div>
                </HeadlessTippy>
            </div>
        </>
    )
}

export default Search;