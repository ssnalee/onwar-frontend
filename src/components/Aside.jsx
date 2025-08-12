import { MAINMENU } from "../utils/menu";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { isVisible } from '@testing-library/user-event/dist/utils';
import { useState } from "react";
import AlertModal from '../components/modal/modalAlert';

const Side = styled.div`
  position: fixed;
  left: 0;
  top: 70px;
  display: flex;
  width: 90%;
  max-width: 200px;
  padding: 20px ;
  background-color: #e6e6e6;
  height: 100%;
`;
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  >div{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  p{
    font-weight: 600;
    /* text-align: center; */
    color: ${props => props.theme.colors.deep_gray};
  }
   a{
    padding: 5px;
    border-radius: 5px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 5px;
    &:hover{
      background: linear-gradient(to right, #ffbb00 0%, rgba(255, 208, 0, 0) 100%);
    }
    &.active{
      background: linear-gradient(to right, #ffbb00 0%, rgba(255, 208, 0, 0) 100%);
      color:#000;

    }
   }
   span{
    font-size: 0.6rem;
    background-color: #48eb08;
    color:#fff;
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 2px;
   }
`;
export default function Aside() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Side>
      <Nav>
        {
          MAINMENU.map(menu => (
            <div key={menu.id}>
              <p>{menu.title}</p>
              <div className="gray-line"></div>
              {
                menu.subMenu.map(sub => (
                  <Link
                    key={sub.path}
                    to={sub.beta ? '#' : sub.path}
                    className={sub.path === currentPath ? 'active' : ''}
                    onClick={e => {
                      if (sub.beta) {
                        e.preventDefault();
                        setIsVisible(true);
                      }
                    }}
                  >{sub.title}
                   {sub.beta && <span>준비중</span>}
                  </Link>
                ))
              }
            </div>
          ))
        }
      </Nav>
      {
        isVisible &&
        <AlertModal
          isVisible={isVisible}
          title="알림"
          content="해당 서비스는 준비중입니다."
          onCloseDialogHandler={()=>setIsVisible(false)}
        />
      }
    </Side>

  )
}

