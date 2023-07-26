import designs from "../A3_AdminStyling/A2_GatepassTableStyling";
import React, {useState} from "react";
import A4_UpdateUser from "../A6_Modals/A4_UpdateUser";

const A5_AllUsersTable = ({ userData, handleNextPage, handlePreviousPage, page_number, searchQuery, setSearchQuery }) => {

    const [ShowUpdateUser, setShowUpdateUser] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState("")

    const filteredUserData = userData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const totalFilteredPages = Math.ceil(filteredUserData.length / 5);

    const filteredStartingIndex = (page_number - 1) * 5;

    const usersToDisplay = filteredUserData.slice(filteredStartingIndex, filteredStartingIndex + 5);

    return (
        <div className={`bg-background`}>
            <div>
                {ShowUpdateUser === true && <A4_UpdateUser setShowUpdateUser={setShowUpdateUser} selectedUserId={selectedUserId}/>}
            </div>
            <div>
                <div className={`${designs.d1}`}>
                    <div>
                        <input
                            className={`rounded-xl px-2`}
                            placeholder={`Search User`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className={`${designs.d2} `}>
                        <div className={`${designs.d5} `}>Sno.</div>
                        <div className={`${designs.d5} `}>Email Id</div>
                        <div className={`${designs.d5} `}>Name </div>
                        <div className={`${designs.d5} `}>Phone </div>
                    </div>
                </div>

                <div className={`${designs.d3}`}>
                    {usersToDisplay.map((item, idx) => (
                        <div className={`${designs.d4} hover:bg-Items_bg hover:border border-black hover:cursor-pointer`} key={idx} onClick={() => {
                            setShowUpdateUser(true);
                            console.log(item.user_id)
                            setSelectedUserId(item.user_id);
                        }}>
                            <h1 className={`${designs.d5}`}>{idx + filteredStartingIndex + 1}</h1>
                            <h1 className={`${designs.d5} hover:overflow-visible`}>{item.email_id}</h1>
                            <h1 className={`${designs.d5}`}>{item.name}</h1>
                            <h1 className={`${designs.d5}`}>{item.contact_number}</h1>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-4 bg-background">
                <button
                    className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
                    onClick={handlePreviousPage}
                    disabled={page_number === 1}
                >
                    Previous
                </button>
                <div className="mx-2 bg-background mt-2">Page: {page_number} / {totalFilteredPages}</div>
                <button
                    className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
                    onClick={handleNextPage}
                    disabled={page_number >= totalFilteredPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default A5_AllUsersTable;
