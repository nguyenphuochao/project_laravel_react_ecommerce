import React from 'react'

export default function Loading() {
    return (
        <>
            <tr>
                <td className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </td>
            </tr>
        </>
    )
}
