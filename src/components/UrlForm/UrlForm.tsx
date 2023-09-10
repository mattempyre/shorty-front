import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@material-tailwind/react';
import { FormValues } from '@/types/types';
import isValidURL from '@/utilities/isValidUrl';
import InputField from '../Input/InputField';
import useUrlManager from '@/hooks/useUrlManager';
import { toast } from 'sonner';

const UrlForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormValues>();
  const { submitUrl, error } = useUrlManager();

  const onSubmit = async (data: FormValues) => {
    await submitUrl(data);
    reset();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="max-w-screen mx-auto">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen min-w-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Shorten Your URL
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <InputField
                label="Enter a long URL"
                id="longUrl"
                type="text"
                register={register}
                validation={{
                  required: 'Long URL is required',
                  validate: (value: string) =>
                    isValidURL(value) || 'Invalid URL format',
                }}
                size="md"
                color="blue"
                error={!!errors.longUrl}
                crossOrigin={false}
              />
              {errors.longUrl && (
                <p className="text-red-500 text-sm">{errors.longUrl.message}</p>
              )}
            </div>
            <div>
              <InputField
                label="Custom back-half of the short URL (optional)"
                id="customShortUrl"
                type="text"
                register={register}
                size="md"
                color="green"
                crossOrigin={false}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              ripple
              color="green"
              disabled={!isDirty}
            >
              Create Short URL
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UrlForm;
