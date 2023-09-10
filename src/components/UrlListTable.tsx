import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchUrls, updateLongUrl } from '../store/urlsSlice';
import { Card, Typography, Button } from '@material-tailwind/react';
import axios from 'axios';

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
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

            // Truncate longUrl to 15 characters
            const truncatedLongUrl =
              longUrl.length > 30 ? longUrl.slice(0, 30) + '...' : longUrl;

            return (
              <tr key={shortUrl}>
                <td className={classes}>
                  <a
                    href={`http://localhost:9000/${shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick(shortUrl)} // Attach the click handler
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    http://localhost:9000/{shortUrl}
                  </a>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    title={longUrl} // Add a title attribute to display the full URL on hover
                  >
                    {truncatedLongUrl}
                  </Typography>
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
                <td className={classes}>
                  <Button
                    ripple
                    color="blue"
                    onClick={() => {
                      const newLongUrl = prompt(
                        'Enter the new Long URL:',
                        longUrl
                      );
                      if (newLongUrl) {
                        handleEditClick(shortUrl, newLongUrl);
                      }
                    }}
                  >
                    Edit
                  </Button>
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
