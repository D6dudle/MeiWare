import React from "react";


export const Tag =({tagName})=>{
    return(
        <div className="flex flex-row justify-center border border-gray4 mb-2 mt-2 rounded-sm">
            <p className="text-xs font-normal">
                {tagName}
            </p>
        </div>
    )
};
export default Tag;