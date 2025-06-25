import React, { useEffect, useState } from "react";
import axios from "axios";
import { Base_url } from "./Baseurl";

const CallRecordsGrid = () => {
  const [callRecords, setCallRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${Base_url}`);
        if (isMounted) {
          setCallRecords(response.data.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              "Failed to fetch call records. Please try again."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Call Records</h2>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-blue-700 font-semibold">
            Loading CallReacords....
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">CallerId</th>
                <th className="px-4 py-2 border-b">Caller Name</th>
                <th className="px-4 py-2 border-b">Callee</th>
                <th className="px-4 py-2 border-b">Start Time</th>
                <th className="px-4 py-2 border-b">Talk Time</th>
                <th className="px-4 py-2 border-b">Direction</th>
                <th className="px-4 py-2 border-b">Answered</th>
                <th className="px-4 py-2 border-b">Departments</th>
                <th className="px-4 py-2 border-b">Branches</th>
              </tr>
            </thead>
            <tbody>
              {callRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-gray-500">
                    No records found.
                  </td>
                </tr>
              ) : (
                callRecords.map((record) => (
                  <tr key={record.callId}>
                    <td className="px-4 py-2 border-b">{record.caller}</td>
                    <td className="px-4 py-2 border-b">{record.callerName}</td>
                    <td className="px-4 py-2 border-b">{record.callee}</td>
                    <td className="px-4 py-2 border-b">{record.startTime}</td>
                    <td className="px-4 py-2 border-b">{record.talkTime}</td>
                    <td className="px-4 py-2 border-b">{record.direction}</td>
                    <td className="px-4 py-2 border-b">{record.answered}</td>
                    <td className="px-4 py-2 border-b">
                      {Array.isArray(record.departments)
                        ? record.departments.join(", ")
                        : ""}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {Array.isArray(record.branches)
                        ? record.branches.join(", ")
                        : ""}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CallRecordsGrid;
