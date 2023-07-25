import React, { useState, useEffect } from "react";
import profile from "../../StudentComponent/icons/icon-profile.png";
import Cookies from "js-cookie";

const A4_UpdateUser = ({ setShowUpdateUser, selectedUserId }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [hostelDetails, setHostelDetails] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [parentContactNumber, setParentContactNumber] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchUserData = async () => {
            const access_token = Cookies.get("ACCESS_TOKEN");
            try {
                const response = await fetch(
                    `http://localhost:4000/gatepass/v2/admin/user_info/${selectedUserId}`,
                    {
                        headers: {
                            Authorization: access_token,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }
                const data = await response.json();
                console.log("This is the data = ", data);

                // Assuming the data is an array with one element
                if (data.length > 0) {
                    const userData = data[0]; // Extract the user data from the array
                    setName(userData.name);
                    setEmail(userData.email_id);
                    setHostelDetails(userData.hostel);
                    setContactNumber(userData.contact_number);
                    setParentContactNumber(userData.p_number);
                    setLoading(false); // Set loading to false once data is fetched
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        // Fetch user data when the component mounts or when the selectedUserId changes
        fetchUserData();
    }, [selectedUserId]);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
                    <div className="bg-background border border-black w-4/12 p-6 rounded-md">
                        <h1 className="text-xl font-bold mb-4 text-center">
                            View/Update User Details
                        </h1>
                        <div className={`flex justify-center`}>
                            <img src={profile} alt={`profile photo`} />
                        </div>

                        <div>
                            <h1>Name:</h1>
                            <input
                                placeholder="Name"
                                className="m-2 p-1 rounded-md w-full border border-black"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <h1>Email:</h1>
                            <input
                                placeholder="Email"
                                className="m-2 p-1 rounded-md w-full border border-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <h1>Hostel Details:</h1>
                            <input
                                placeholder="Hostel Details"
                                className="m-2 p-1 rounded-md w-full border border-black"
                                value={hostelDetails}
                                onChange={(e) => setHostelDetails(e.target.value)}
                            />
                        </div>

                        <div>
                            <h1>Contact Number:</h1>
                            <input
                                placeholder="Contact Number"
                                className="m-2 p-1 rounded-md w-full border border-black"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                            />
                        </div>

                        <div>
                            <h1>Parent Contact Number:</h1>
                            <input
                                placeholder="Parents Contact Number"
                                className="m-2 p-1 rounded-md w-full border border-black"
                                value={parentContactNumber}
                                onChange={(e) => setParentContactNumber(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-center">
                            <button className="m-2 p-2 bg-blue-500 text-white">Update</button>
                            <button
                                className="m-2 p-2 bg-blue-500 text-white"
                                onClick={() => setShowUpdateUser(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default A4_UpdateUser;
