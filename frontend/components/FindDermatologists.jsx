import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

export default function FindDermatologists() {
    const [docs, setDocs] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const handleSearchChange = (event) => {
      setSearch(event.target.value);
    };

    const highlightText = (text, query) => {
      if (!query) return text;
      const parts = text.split(new RegExp(`(${query})`, 'gi'));
      return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part
      );
    };

    useEffect(() => {
      // Simulate loading for 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, []);

    useEffect(() => {
        applyDoctors();
      }, []);
    
      const applyDoctors = async () => {
        try {
          const r = await axios.get("http://localhost:8088/users");
          setDocs(r.data);
          console.log('rdata', r.data)
          console.log(docs)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        console.log('docs',docs)
      };
    return(
        <>
        {isLoading ? (
          <Loading />
        ) : (
          <div className=" mx-auto max-w-screen-xl text-center ">
            <h2 className="text-xl text-black font-bold sm:text-2xl py-8">
              List of Dermatologists
            </h2>
            <input
        type="search"
        placeholder="Search by place..."
        value={search}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
            <div className=" mx-auto max-w-64 md:max-w-80  lg:max-w-5xl max-h-96 overflow-y-scroll border-2 border-slate-950 rounded-lg" >
            <table className=" max-h-96 overflow-y-scroll w-full border-collapse">
              <thead>
                <tr>
                  <th className=" border-2 text-amber-500 px-3  py-10">
                    Name
                  </th>
                  <th className=" border-2 text-amber-500 px-3 py-10">
                    Address
                  </th>
                  <th className=" border-2 text-amber-500 px-3 py-10">
                    Phone number
                  </th>
                </tr>
              </thead>
              <tbody>
                {docs &&
                  docs.map((arr, idx) => {
                    return (
                      <tr key={idx}>
                        <td
                          key={idx}
                          className=" border-2 px-3 text-slate-700 py-10 text-left"
                        >
                          {arr['name']}
                        </td>
                        <td 
                        key={idx}
                        className=" border px-3 text-slate-700  py-10 text-left">
                          {highlightText(arr['address'], search)}
                        </td>
                        <td
                          key={idx}
                          className=" border-2 px-3 text-slate-700  py-10 text-left"
                        >
                          {arr['phoneNumber']}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            </div>
          </div>
        )}

        </>
    )
}