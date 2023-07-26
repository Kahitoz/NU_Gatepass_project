import React from "react";

const A2_AddGroup = ({ setShowAddGroup }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
            <div className="bg-background border border-black w-4/12 p-6 rounded-md">
                <h1 className="text-xl font-bold mb-4 text-center">Add Group</h1>
                <input
                    placeholder="Enter Group Name"
                    className="m-2 p-1 rounded-md w-full border border-black"
                />
                <div className="flex justify-center">
                    <button className="m-2 p-2 bg-blue-500 text-white">Create Group</button>
                    <button
                        className="m-2 p-2 bg-blue-500 text-white"
                        onClick={() => setShowAddGroup(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default A2_AddGroup;
