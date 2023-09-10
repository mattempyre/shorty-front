import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchUrls, updateLongUrl } from '../store/urlsSlice';
import { Card, Typography, IconButton } from '@material-tailwind/react';
import axios from 'axios';
import { PencilIcon } from '@heroicons/react/24/solid';

const truncateString = (str, maxLen) => {
  if (str.length <= maxLen) return str;
  return str.substr(0, maxLen - 3) + '...';
};

const UrlListTable: React.FC = () => {
  const dispatch = useDispatch();
  const urls = useSelector((state: RootState) => state.urls);

  const handleLinkClick = (shortUrl: string) => (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default behavior of the link

    // Manually open the link in a new tab
    window.open(`http://localhost:9000/${shortUrl}`, '_blank');

    // Fetch data from the API and update the store
    axios
      .get('http://localhost:9000/api/url/all')
      .then((response) => {
        dispatch(fetchUrls(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    // Fetch data from the API and update the store
    axios
      .get('http://localhost:9000/api/url/all')
      .then((response) => {
        dispatch(fetchUrls(response.data));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [dispatch]);

  const [editingUrl, setEditingUrl] = useState<string | null>(null);
  const [editedUrl, setEditedUrl] = useState<string>('');
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null);

  const handleEditHover = (shortUrl: string | null) => {
    setHoveredUrl(shortUrl);
  };

  const handleEditClick = (shortUrl: string, longUrl: string) => {
    // Enable editing for the clicked URL
    setEditingUrl(shortUrl);
    setEditedUrl(longUrl);
  };

  const handleSaveClick = (shortUrl: string) => {
    // Send a PUT request to update the long URL
    axios
      .put(`http://localhost:9000/api/url/update`, {
        shortUrl,
        newLongUrl: editedUrl,
      })
      .then(() => {
        // Update the Redux store with the new long URL
        dispatch(updateLongUrl({ shortUrl, newLongUrl: editedUrl }));
        setEditingUrl(null); // Disable editing
      })
      .catch((error) => {
        console.error('Error updating long URL:', error);
      });
  };

  const TABLE_HEAD = ['Short URL', 'Long URL', 'Link Visits', ''];

  return (
    <Card className="h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {urls.map(({ shortUrl, longUrl, clickCount }, index) => {
            const isLast = index === urls.length - 1;
            const classes = isLast
              ? 'p-4'
              : 'p-4 px-4 border-b border-blue-gray-50';

            const isEditing = editingUrl === shortUrl;
            const isHovering = hoveredUrl === shortUrl;

            return (
              <tr key={shortUrl}>
                <td className={classes}>
                  <a
                    href={`http://localhost:9000/${shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick(shortUrl)}
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    {truncateString(`http://localhost:9000/${shortUrl}`, 40)}
                  </a>
                </td>
                <td
                  className={`flex items-center ${classes} h-14`}
                  onMouseEnter={() => handleEditHover(shortUrl)}
                  onMouseLeave={() => handleEditHover(null)}
                >
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editedUrl}
                        onChange={(e) => setEditedUrl(e.target.value)}
                        style={{
                          width: `${editedUrl.length * 9}px`, // Adjust the multiplier as needed
                          minWidth: '30px', // Set a minimum width to avoid it becoming too small
                          border: 'none', // Remove border
                          outline: 'none', // Remove outline
                        }}
                        className="p-0 focus:ring-0"
                        autoFocus
                      />
                      <IconButton
                        color="blue"
                        onClick={() => handleSaveClick(shortUrl)}
                      >
                        save
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal mr-2"
                        title={longUrl} // Add a title attribute to display the full URL on hover
                      >
                        {truncateString(longUrl, 50)}
                      </Typography>
                      {isHovering && (
                        <IconButton
                          onClick={() => handleEditClick(shortUrl, longUrl)}
                          size="sm"
                          variant="text"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </IconButton>
                      )}
                    </>
                  )}
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {clickCount}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default UrlListTable;
