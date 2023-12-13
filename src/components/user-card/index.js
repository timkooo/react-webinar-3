import { memo } from "react";
import './style.css';

function UserCard(props) {

  return (
    <div className="UserCard">
      <h2 className="UserCard__title">Профиль</h2>
      <p className="UserCard__item">Имя:&nbsp;<span className="UserCard__value">{props.user.profile.name}</span></p>
      <p className="UserCard__item">Телефон:&nbsp;<span className="UserCard__value">{props.user.profile.phone}</span></p>
      <p className="UserCard__item">email:&nbsp;<span className="UserCard__value">{props.user.email}</span></p>
    </div>
  )
}

export default memo(UserCard);
