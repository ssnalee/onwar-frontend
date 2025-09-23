// import Select, { components } from "react-select";
// import { useRef, useEffect, useState } from "react";


// const CustomMenuList = (props) => {
//   const { children, selectProps } = props;
//   const inputRef = useRef();

//   useEffect(() => {
//     if (selectProps.menuIsOpen && inputRef.current) {
//       const timer = setTimeout(() => inputRef.current.focus(), 50);
//       return () => clearTimeout(timer);
//     }
//   }, [selectProps.menuIsOpen]);

//   return (
//     <components.MenuList {...props}>
//       {children}
//       <div style={{ padding: "8px", minHeight: "50px" }}>
//         <input
//           ref={inputRef}
//           type="text"
//           placeholder="배틀태그 입력 예) 홍길동#1234"
//           value={selectProps.selectedTag} 
//           onChange={(e) => selectProps.setSelectedTag(e.target.value)}
//           onMouseDown={(e) => e.stopPropagation()}
//           onClick={(e) => e.stopPropagation()}
//           style={{
//             width: "250px",
//             padding: "6px",
//             border: "1px solid #d3d3d3",
//           }}
//         />
//       </div>
//     </components.MenuList>
//   );
// };

// export default function BoardSelectBattletag({ options, selectedTag, setSelectedTag }) {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <Select
//       options={options || []}
//       value={selectedTag ? { value: selectedTag, label: selectedTag } : null}
//       onChange={(opt) => setSelectedTag(opt.value)}
//       placeholder="배틀태그 선택"
//       components={{ MenuList: CustomMenuList }}
//       menuIsOpen={menuOpen}
//       onMenuOpen={() => setMenuOpen(true)}
//       onMenuClose={() => setMenuOpen(true)}
//       selectedTag={selectedTag}
//       setSelectedTag={setSelectedTag}
//       isSearchable={false}
//       styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
//     />
//   );
// }

import styled from "styled-components";
import { useState, useRef } from "react";
import { IoCloseCircle } from "react-icons/io5";


const SelectedWrap = styled.div`
    position: relative;
    input{
        width: 100% !important; 
        padding: 10px; 
        border: 1px solid #d3d3d3;
    }
    .close_btn{
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
    }
`;
const Dropdown = styled.div`
    position: absolute;
    top: 110%;
    left: 0;
    right: 0;
    border: 1px solid #d3d3d3;
    background: white;
    z-index: 9999;
    margin: 0;
    padding: 0 0 5px 0;
    border-radius: 5px;
    p{
        margin-top: 0 !important;
        padding: 13px 8px 8px 8px;
        color: #0093ff;
    }
`;
const Ul = styled.ul`
    max-height: 150px;
    overflow-y: auto;
    li{
        padding: 8px;
        cursor: pointer;
        &:hover{
        background-color: #cde7ff;
        }
    }
`;

export default function BattletagInput({ options, selectedTag, setSelectedTag }) {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef();

    const handleSelect = (value) => {
        setSelectedTag(value);
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setSelectedTag(e.target.value);
            setIsOpen(false);
        }
    };

    const clearHandler = () => {
        setSelectedTag("");
        setIsOpen(false);
    }

    return (
        <SelectedWrap>
            <input
                ref={inputRef}
                value={selectedTag || ""}
                onChange={(e) => setSelectedTag(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder={options.length > 0 ? '배틀태그 선택 또는 입력' : '배틀태그 입력 예) 홍길동#1234'}
            />
            <div className="close_btn" onClick={clearHandler}><IoCloseCircle fontSize="25px" color="#888" /></div>
            {isOpen && options.length > 0 && (
                <Dropdown>
                    <p>내 배틀태그 목록</p>
                    <Ul>
                        {options
                            .map((opt) => (
                                <li
                                    key={opt.value}
                                    onMouseDown={() => handleSelect(opt.label)}
                                >
                                    {opt.label}
                                </li>
                            ))}
                    </Ul>
                </Dropdown>
            )}
        </SelectedWrap>
    );
}
