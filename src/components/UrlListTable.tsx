import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchUrls, updateLongUrl } from '../store/urlsSlice';
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import axios from 'axios';

import { MdCancel, MdCheckCircle, MdModeEdit } from 'react-icons/md';

interface UrlData {
  shortUrl: string;
  longUrl: string;
  clickCount: number;
}

const truncateString = (str: string, maxLen: number) => {
  if (str.length <= maxLen) return str;
  return str.substr(0, maxLen - 3) + '...';
};

const isValidURL = (url: string): boolean => {
  // Regex pattern for URL validation with optional protocols and required TLD and domain
  const urlRegex =
    /^(?:(https?|ftp):\/\/)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d+)?(?:\/\S*)?$/i;

  // Check if the URL matches the regex pattern
  return urlRegex.test(url);
};

const UrlListTable: React.FC = () => {
  const dispatch = useDispatch();
  const urls = useSelector((state: RootState) => state.urls);

  const [originalUrls, setOriginalUrls] = useState<{ [key: string]: string }>(
    {}
  );

  const handleLinkClick =
    (shortUrl: string) =>
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      window.open(`http://localhost:9000/${shortUrl}`, '_blank');
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
    axios
      .get('http://localhost:9000/api/url/all')
      .then((response) => {
        dispatch(fetchUrls(response.data));
        const originalUrlData: { [key: string]: string } = {};
        response.data.forEach((urlData: UrlData) => {
          originalUrlData[urlData.shortUrl] = urlData.longUrl;
        });
        setOriginalUrls(originalUrlData);
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

  const handleLongUrlClick = (shortUrl: string) => {
    // Set the clicked URL for editing
    setEditingUrl(shortUrl);
    setEditedUrl(originalUrls[shortUrl]);
  };

  const handleLongUrlBlur = (shortUrl: string) => {
    // Check if the edited URL has a protocol, if not, add "http://"
    let updatedEditedUrl = editedUrl;
    if (!/^https?:\/\//i.test(updatedEditedUrl)) {
      updatedEditedUrl = `http://${updatedEditedUrl}`;
    }
    setEditedUrl(updatedEditedUrl);

    // If the edited URL is different from the original, update it
    if (updatedEditedUrl !== originalUrls[shortUrl]) {
      handleSaveClick(shortUrl);
    } else {
      // If it's the same, cancel editing
      handleCancelClick();
    }
  };

  const handleEditClick = (shortUrl: string, longUrl: string) => {
    setEditingUrl(shortUrl);
    setEditedUrl(longUrl);
  };

  const handleSaveClick = (shortUrl: string) => {
    let updatedEditedUrl = editedUrl;

    // Check if the edited URL has a protocol, if not, add "http://"
    if (!/^https?:\/\//i.test(updatedEditedUrl)) {
      updatedEditedUrl = `http://${updatedEditedUrl}`;
    }

    if (
      updatedEditedUrl !== originalUrls[shortUrl] &&
      isValidURL(updatedEditedUrl)
    ) {
      axios
        .put(`http://localhost:9000/api/url/update`, {
          shortUrl,
          newLongUrl: updatedEditedUrl, // Use the updated URL here
        })
        .then(() => {
          dispatch(updateLongUrl({ shortUrl, newLongUrl: updatedEditedUrl }));
          setEditingUrl(null);
        })
        .catch((error) => {
          console.error('Error updating long URL:', error);
        });
    }
  };

  const handleCancelClick = () => {
    setEditedUrl(originalUrls[editingUrl || '']);
    setEditingUrl(null);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveClick(editingUrl || '');
    } else if (event.key === 'Escape') {
      handleCancelClick();
    }
  };

  const TABLE_HEAD = ['Short URL', 'Long URL', 'Link Visits'];

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
            const isURLChanged = editedUrl !== originalUrls[shortUrl];
            const isValid = isValidURL(editedUrl);

            return (
              <tr key={shortUrl}>
                <td className={classes} style={{ maxWidth: '200px' }}>
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
                  onClick={() => handleLongUrlClick(shortUrl)} // Click to edit
                  onBlur={() => handleLongUrlBlur(shortUrl)} // Save/cancel editing on blur
                  style={{ cursor: 'pointer' }}
                >
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editedUrl}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setEditedUrl(e.target.value)
                        }
                        onKeyDown={handleInputKeyDown}
                        style={{
                          width: `${editedUrl.length * 9}px`,
                          minWidth: '30px',
                          border: 'none',
                          outline: 'none',
                          borderBottom: isValid ? 'none' : '2px solid red',
                        }}
                        className="p-0 focus:ring-0 max-w-sm"
                        autoFocus
                      />
                      <IconButton
                        variant="text"
                        color="red"
                        onClick={handleCancelClick}
                      >
                        <MdCancel className="w-6 h-6" />
                      </IconButton>

                      <Tooltip
                        color="red"
                        placement="bottom"
                        content="Can't save, Invalid URL format"
                        isOpen={!isValid}
                      >
                        <span>
                          <IconButton
                            color="green"
                            variant="text"
                            onClick={() => handleSaveClick(shortUrl)}
                            disabled={!isURLChanged || !isValid}
                          >
                            <MdCheckCircle className="w-6 h-6 text-green-700 hover:text-green-300" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip
                        content="Click to edit"
                        color="blue"
                        placement="top-start"
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal mr-2"
                          title={longUrl}
                          onClick={() => handleEditClick(shortUrl, longUrl)}
                        >
                          {truncateString(longUrl, 30)}
                        </Typography>
                      </Tooltip>
                    </>
                  )}
                </td>
                <td className={classes} style={{ maxWidth: '30px' }}>
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
