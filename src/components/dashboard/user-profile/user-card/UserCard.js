import React from 'react';
import * as localeConfig from 'moment/locale/ru';
import moment from 'moment';
moment.updateLocale('ru', localeConfig);

const UserCard = ({userData}) => (
    <div className="col-sm-12 col-md-4 col-lg-4">
        <div className="panel panel-default panel-profile-info">
            <div className="panel-heading text-center">
                <div className="user-avatar">
                    <i className="fa fa-user-circle"></i>
                </div>
                <div className="user-email">{userData.email}</div>
            </div>

            <ul className="list-group text-center">
                <li className="list-group-item">
                    <h5>Дата регистрации</h5>
                    <p>{moment(userData.created).format('LLL')}</p>
                </li>

                <li className="list-group-item">
                    <h5>Вход выполнен</h5>
                    <p>{moment(userData.lastVisit).format('LLL')}</p>
                </li>
            </ul>
        </div>
    </div>
)

export default UserCard;