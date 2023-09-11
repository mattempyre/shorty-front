import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchUrls, updateLongUrl } from '../store/urlsSlice';
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  DialogHeader,
} from '@material-tailwind/react'; // Import various components from Material Tailwind library
import axios from 'axios'; // Import axios for making HTTP requests
import { MdCancel, MdCheckCircle, MdDelete } from 'react-icons/md'; // Import icons from react-icons library
import { toast } from 'sonner'; // Import toast notifications from 'sonner'
import isValidURL from '@/utilities/isValidUrl'; // Import a utility function to validate URLs

interface UrlData {
  shortUrl: string;
  longUrl: string;
  clickCount: number;
}

// Function to truncate a string if it exceeds a maximum length
const truncateString = (str: string, maxLen: number) => {
  if (str.length <= maxLen) return str;
  return str.substring(0, maxLen - 3) + '...';
};

// Define the UrlListTable component
const UrlListTable: React.FC = () => {
  const dispatch = useDispatch();
  const urls = useSelector((state: RootState) => state.urls);

  // State to store original URLs and data for deletion
  const [originalUrls, setOriginalUrls] = useState<{ [key: string]: string }>(
    {}
  );
  const [deleteData, setDeleteData] = useState<UrlData | null>(null);

  // Function to handle clicking on a short URL link
  const handleLinkClick =
    (shortUrl: string) =>
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      // Open the short URL in a new tab and refresh the URL list
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

  // Use effect to fetch initial data and update original URLs
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
  }, [dispatch, urls]);

  // State for editing URLs and edited URL value
  const [editingUrl, setEditingUrl] = useState<string | null>(null);
  const [editedUrl, setEditedUrl] = useState<string>('');

  // Function to handle clicking on a long URL for editing
  const handleLongUrlClick = (shortUrl: string) => {
    if (editingUrl === shortUrl) {
      return;
    }
    setEditingUrl(shortUrl);
    setEditedUrl(originalUrls[shortUrl]);
  };

  // Function to handle blurring from an edited long URL input
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

  // Function to handle clicking the edit button for a long URL
  const handleEditClick = (shortUrl: string, longUrl: string) => {
    setEditingUrl(shortUrl);
    setEditedUrl(longUrl);
  };

  // Function to handle clicking the save button for editing a long URL
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
          newLongUrl: updatedEditedUrl,
        })
        .then(() => {
          dispatch(updateLongUrl({ shortUrl, newLongUrl: updatedEditedUrl }));
          setEditingUrl(null);

          // Show a success toast
          toast.success('Long URL updated successfully');
        })
        .catch((error) => {
          console.error('Error updating long URL:', error);

          // Show an error toast
          toast.error('An error occurred while updating the long URL.');
        });
    } else {
      // Show an error toast if the URL is invalid
      toast.error('Invalid URL format or no changes made.');
    }
  };

  // Function to handle clicking the cancel button for editing
  const handleCancelClick = () => {
    setEditedUrl(originalUrls[editingUrl || '']);
    setEditingUrl(null);
  };

  // Function to handle keyboard events in the edited URL input
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveClick(editingUrl || '');
    } else if (event.key === 'Escape') {
      handleCancelClick();
    }
  };

  // State for the delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState<string>('');

  // Function to open the delete modal
  const openDeleteModal = (shortUrl: string) => {
    setShowDeleteModal(true);
    setUrlToDelete(shortUrl);
    // Find the delete data for the specific shortUrl
    const dataToDelete = urls.find((url) => url.shortUrl === shortUrl);
    if (dataToDelete) {
      setDeleteData(dataToDelete);
    }
  };

  // Function to close the delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setUrlToDelete('');
    setDeleteData(null);
  };

  // Function to handle clicking the delete button in the modal
  const handleDeleteClick = () => {
    if (deleteData) {
      // Perform the delete action here
      axios
        .delete(`http://localhost:9000/api/url/delete/${urlToDelete}`)
        .then(() => {
          // Refresh the URL list after deletion
          axios
            .get('http://localhost:9000/api/url/all')
            .then((response) => {
              dispatch(fetchUrls(response.data));
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
          closeDeleteModal(); // Close the modal after successful deletion

          // Show a success toast
          toast.success('Short URL deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting URL:', error);
          closeDeleteModal(); // Close the modal in case of an error

          // Show an error toast
          toast.error('An error occurred while deleting the short URL.');
        });
    }
  };

  // Define the table headers
  const TABLE_HEAD = ['Short URL', 'Long URL', 'Visits', 'Actions'];

  return (
    <Card className="h-full w-full items-center bg-gray-100 rounded-none">
      <table
        id="links"
        className="w-full min-w-max table-auto text-left max-w-screen-lg shadow-lg -mt-16
       mb-10"
      >
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-800 p-4"
                style={{ fontSize: '14px' }}
              >
                <Typography
                  variant="h4"
                  color="white"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {urls.map(({ shortUrl, longUrl, clickCount }, index) => {
            const isLast = index === urls.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

            const isEditing = editingUrl === shortUrl;
            const isURLChanged = editedUrl !== originalUrls[shortUrl];
            const isValid = isValidURL(editedUrl);

            return (
              <tr key={shortUrl}>
                <td className={classes} style={{ maxWidth: '400px' }}>
                  <a
                    href={`http://localhost:9000/${shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick(shortUrl)}
                    className="text-blue-500 text-sm hover:underline cursor-pointer"
                  >
                    {truncateString(`http://localhost:9000/${shortUrl}`, 40)}
                  </a>
                </td>
                <td
                  className={`flex items-center ${classes} h-20 long-url-column`}
                  onClick={() => handleLongUrlClick(shortUrl)}
                  onBlur={() => handleLongUrlBlur(shortUrl)}
                  style={{ cursor: 'pointer', width: '400px' }}
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
                        className="p-0 focus:ring-0 max-w-sm text-sm"
                        autoFocus
                      />
                      <IconButton
                        variant="text"
                        color="red"
                        onClick={handleCancelClick}
                      >
                        <MdCancel className="w-6 h-6" />
                      </IconButton>

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
                    </>
                  ) : (
                    <>
                      <div className="">
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
                            className="font-normal mr-2 text-sm pt-4'"
                            title={longUrl}
                            onClick={() => handleEditClick(shortUrl, longUrl)}
                          >
                            {truncateString(longUrl, 30)}
                          </Typography>
                        </Tooltip>
                      </div>
                    </>
                  )}
                </td>
                <td className={classes} style={{ maxWidth: '30px' }}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center"
                  >
                    {clickCount}
                  </Typography>
                </td>
                <td className={classes} style={{ textAlign: 'center' }}>
                  <IconButton
                    color="red"
                    variant="text"
                    onClick={() => openDeleteModal(shortUrl)} // Open the delete modal
                  >
                    <MdDelete className="w-6 h-6 text-gray-400 hover:text-red-700 transition duration-150 ease-out hover:ease-in" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Dialog
        size="sm"
        open={showDeleteModal}
        handler={closeDeleteModal}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Delete Short URL</DialogHeader>
        {deleteData && (
          <DialogBody>
            <Typography
              className="font-normal"
              variant="paragraph"
              color="blue-gray"
            >
              Are you sure you want to delete{' '}
              <a
                className="font-bold text-slate-500 hover:underline"
                href={`http://localhost:9000/${deleteData.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                http://localhost:9000/{truncateString(deleteData.shortUrl, 30)}
              </a>
              ? It currently links to{' '}
              <a
                className="font-bold text-slate-500 hover:underline"
                href={deleteData.longUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {truncateString(deleteData.longUrl, 40)}
              </a>{' '}
              and has been visited{' '}
              <span className="text-red-500 font-bold">
                {deleteData.clickCount}
              </span>{' '}
              {deleteData.clickCount === 1 ? 'time' : 'times'}.
            </Typography>
          </DialogBody>
        )}
        <DialogFooter>
          <div className="w-full text-right">
            <Button
              variant="outlined"
              onClick={() => closeDeleteModal()}
              className="mr-3"
            >
              Cancel
            </Button>
            <Button
              color="red"
              variant="gradient"
              ripple
              className="mr-1"
              onClick={() => handleDeleteClick()}
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default UrlListTable;
