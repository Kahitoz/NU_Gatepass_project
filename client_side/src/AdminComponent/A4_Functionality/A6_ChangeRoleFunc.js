import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import Cookies from "js-cookie";
import designs from "../A3_AdminStyling/A2_GatepassTableStyling";
const A6_ChangeRole = () => {

    const [user, setUser] = useState([]);
    const [role, setRole] = useState([]);
    const [status, setStatus] = useState([]);
    const [newRole, setNewRole] = useState({ role_name: null, role_id: null });
    const [newStatus, setNewStatus] = useState({ status: null });

    const [pageNumber, setPageNumber] = useState(1);

    const accessToken = Cookies.get("ACCESS_TOKEN");


    useEffect(() => {
        fetch("http://127.0.0.1:4000/gatepass/v2/admin/all_role", {
            headers: {
                Authorization: accessToken,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((text) => {
                setRole(text);
            });
        console.log(role);

        fetch("http://127.0.0.1:4000/gatepass/v2/admin/all_status", {
            headers: {
                Authorization: accessToken,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((text) => {
                setStatus(text);
            });
        console.log(status);

        fetch("http://127.0.0.1:4000/gatepass/v2/admin/user_role", {
            headers: {
                Authorization: accessToken,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((text) => {
                setUser(text);
            });
        console.log(user);
    }, []);

    const changeRoleOrStatus = async (user_id, status, role_id) => {
        let fetchData = await fetch(
            "http://127.0.0.1:4000/gatepass/v2/admin/update_role_and_status",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: accessToken,
                },
                body: JSON.stringify({
                    user_id: user_id,
                    status: status,
                    role_id: role_id,
                }),
            }
        )
            .then((Response) => Response.json())
            .then((response) => console.log("Success: " + response.msg))
            .catch((error) => console.log("error: " + error));
        return fetchData;
    };

    const handleRoleDropdown = (event) => {
        const roleName = event.value;
        const roleobj = role.filter((obj) => {
            return obj.role_name == roleName;
        });
        const roleID = roleobj[0].role_id;
        setNewRole({ role_name: roleName, role_id: roleID });
    };

    const handleStatusDropdown = (event) => {
        const StatusName = event.value;
        setNewStatus({ status: StatusName });
    };

    const handleClick = async (event) => {
        const userID = event.target.id;
        changeRoleOrStatus(userID, newStatus.status, newRole.role_id);
        window.location.reload(true);
    };

    return (
        <div>
            
            <div>
           
                <div>
                    <div>Change Role</div>
                            <div className={`${designs.d1}`}>
                                <div className={`${designs.d2}`}>
                                    <h1 className={`${designs.d5}`}>Name</h1>
                                    <h1 className={`${designs.d5}`}>Current Role</h1>
                                    <h1 className={`${designs.d5}`}>Change Role</h1>
                                    <h1 className={`${designs.d5}`}>Current Status</h1>
                                    <h1 className={`${designs.d5}`}>Change Status</h1>
                                    <h1 className={`${designs.d5}`}></h1>
                                </div>
                            </div>

                    <div className={`${designs.d3}`}>
                                {user.map((row) => (
                                    <div key={row.employeecode} className={`${designs.d4}`}>
                                        <h1 className={`${designs.d5}`}>
                                            {row.employeename}
                                        </h1>
                                        <h1 className={`${designs.d5}`}>
                                            {row.employeerole}
                                        </h1>
                                        <h1 className={`${designs.d5}`}>
                                            <Dropdown
                                                options={role.map((props) => props.role_name)}
                                                style={{ borderRadius: "40" }}
                                                placeholder="Select a role"
                                                onChange={handleRoleDropdown}
                                                id={row.employeecode}
                                            />
                                        </h1>
                                        <h1 className={`${designs.d5}`}>
                                            {row.employeestatus}
                                        </h1>
                                        <h1 className={`${designs.d5}`}>
                                            <Dropdown
                                                options={status.map((props) => props.status)}
                                                style={{ borderRadius: "40" }}
                                                placeholder="Select a status"
                                                onChange={handleStatusDropdown}
                                            />
                                        </h1>
                                        <h1 className={`${designs.d5}`}>
                                            <button
                                                type="button"
                                                style={{
                                                    background: "green",
                                                    color: "#fff",
                                                    borderRadius: "5px",
                                                }}
                                                id={row.employeecode}
                                                onClick={handleClick}
                                            >
                                                Save
                                            </button>
                                        </h1>
                                    </div>
                                ))}
                            </div>
                </div>
            </div>
        </div>
    );
};

export default A6_ChangeRole;
