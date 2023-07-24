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
        // Fetching role data
        fetch("http://127.0.0.1:4000/gatepass/v2/admin/all_role", {
            headers: {
                Authorization: accessToken,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setRole(data);
            })
            .catch((error) => console.error("Error fetching role data:", error));

        // Fetching status data
        fetch("http://127.0.0.1:4000/gatepass/v2/admin/all_status", {
            headers: {
                Authorization: accessToken,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setStatus(data);
            })
            .catch((error) => console.error("Error fetching status data:", error));

        // Fetching user data
        fetch("http://127.0.0.1:4000/gatepass/v2/admin/user_role", {
            headers: {
                Authorization: accessToken,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, [accessToken]);

    const handleNextPage = () => {
        setPageNumber((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber((prevPage) => prevPage - 1);
        }
    };

    const usersPerPage = 5;
    const startIndex = (pageNumber - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const paginatedUsers = user.slice(startIndex, endIndex);

    const handleSearch = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const filteredUsers = user.filter((row) =>
            row.employeename.toLowerCase().includes(searchQuery)
        );
        setUser(filteredUsers);
        setPageNumber(1);
    };


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

                <div className={`${designs.d1}`}>
                    <input
                        type="text"
                        placeholder="Search User"
                        onChange={handleSearch}
                        className={`rounded-xl px-2`}
                    />
                    <div className={`${designs.d2}`}>
                        <h1 className={`${designs.d5}`}>Name</h1>
                        <h1 className={`${designs.d5}`}>Current Role</h1>
                        <h1 className={`${designs.d5}`}>Change Role</h1>
                        <h1 className={`${designs.d5}`}>Current Status</h1>
                        <h1 className={`${designs.d5}`}>Change Status</h1>
                        <h1 className={`${designs.d5}`}>Action</h1>
                    </div>
                </div>
                <div className={`${designs.d3}`}>
                    {paginatedUsers.map((row) => (
                        // Rendering user data for the current page
                        <div key={row.employeecode} className={`${designs.d4}`}>
                            <h1 className={`${designs.d5}`}>{row.employeename}</h1>
                            <h1 className={`${designs.d5}`}>{row.employeerole}</h1>
                            <h1 className={`${designs.d5}`}>
                                <Dropdown
                                    options={role.map((props) => props.role_name)}
                                    placeholder="Select a role"
                                    onChange={handleRoleDropdown}
                                    className={`bg-white  px-1 rounded-md font-bold text-black shadow-md`}
                                    id={row.employeecode}
                                />
                            </h1>
                            <h1 className={`${designs.d5}`}>{row.employeestatus}</h1>
                            <h1 className={`${designs.d5}`}>
                                <Dropdown
                                    options={status.map((props) => props.status)}
                                    placeholder="Select a status"
                                    className={`bg-white  px-1 rounded-md font-bold text-black shadow-md`}
                                    onChange={handleStatusDropdown}
                                />
                            </h1>
                            <h1 className={`${designs.d5}`}>
                                <button
                                    type="button"
                                    className="bg-Navbar_bg p-2 text-white hover:border-2"
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

            {/* Pagination */}
            <div className="flex justify-center mt-4 bg-background">
                <button
                    className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
                    onClick={handlePreviousPage}
                    disabled={pageNumber === 1}
                >
                    Previous
                </button>
                <div className="mx-2 bg-background mt-2">Page: {pageNumber}</div>
                <button
                    className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
                    onClick={handleNextPage}
                    disabled={endIndex >= user.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default A6_ChangeRole;
