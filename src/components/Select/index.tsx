import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef, useEffect, useMemo } from 'react';
import Input from '../Input'
import sx from '../../styles/component.module.scss'
import Chip from '../Chip'
import useClickOutside from '@/hooks/useClickOutside';


const Select = ({ id, placeholder="Select...", options, isMulti=false, isSearchable=false, width, style, theme="light", state="close", surface="1", onChange, onClick }: IPropsSelect) => {

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [search, setSearch] = useState<string>('');
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useClickOutside(wrapperRef, () => setShowOptions(false));

    console.log(showOptions)
    console.log(placeholder)
    console.log(selectedOptions)

    const handleOptionClick = (option: Option) => {
        if (isMulti) {
            setSelectedOptions((prevSelected) =>
                prevSelected.some((item) => item.value === option.value)
                    ? prevSelected.filter((item) => item.value !== option.value)
                    : [...prevSelected, option]
            );
        } else {
            setSelectedOptions([option]);
            setShowOptions(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const removeOption = (option: Option) => {
        return (selectedOptions as Option[]).filter((o) => o.value !== option.value);
    };

    const onTagRemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, option: Option) => {
        e.stopPropagation();
        const newValue = removeOption(option);
        setSelectedOptions(newValue);
        // onChange(newValue); 
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    const customWidth:React.CSSProperties = {
        "width": width,
        ...style
    }

    return (
        <div className={sx['select']} id={id} style={customWidth} data-open={showOptions} data-theme={theme} data-surface={surface} ref={wrapperRef}>
            <div className={sx['select-current']} onClick={() => {
                setShowOptions(!showOptions);
                searchRef.current?.focus();
            }}>
                <div className={sx["select-current_value"]} data-multiple={isMulti} >
                    {
                        isMulti ? (
                            <div className={sx['select-current_tags']}>
                                {
                                    selectedOptions.map((option) => (
                                        <Chip key={option.value} size="small" theme={theme} onClose={(e) => onTagRemove(e, option)}>{option.label}</Chip>
                                    )) || {placeholder}
                                }
                                {selectedOptions.length === 0 && <span>{placeholder}</span>}
                            </div>
                        ) : selectedOptions.length > 0 ? selectedOptions.map((option) => option.label) : <span>{placeholder}</span>
                            

                    }
                </div>
                <div className={sx["select-current_icon"]}>
                    <FontAwesomeIcon icon={showOptions ? "chevron-up" : "chevron-down"} />
                </div>
            </div>
            {showOptions && (
                <div className={sx['select-dropdown']}>
                    {isSearchable && (
                        <div className={sx['select-dropdown_search']}>
                            <Input type="text" name="search" size="small" placeholder="Search..." value={search} innerRef={searchRef} onChange={handleSearchChange} />
                        </div>
                    )}
                    <div className={sx["select-dropdown_options"]}>
                        {
                            filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => {
                                    const isSelected = selectedOptions.some((selected) => selected.value === option.value)
                                    return (
                                        <div onClick={() => handleOptionClick(option)} key={option.value} className={sx['select-dropdown_option']} data-selected={isSelected}>
                                            {option.label}
                                        </div>
                                    )
                                })
                            ) : (
                                <div className={sx["select-dropdown_no-results"]}>no results found!</div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default Select