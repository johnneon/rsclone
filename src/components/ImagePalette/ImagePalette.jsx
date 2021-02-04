import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import Palette from '../Palette/Palette';
import getImagesRequest from '../../utils/getImagesRequest';

const ImagePalette = ({ onClick }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = useCallback((message, variant) => (
    enqueueSnackbar(message, { variant })
  ), [enqueueSnackbar]);

  const getImages = useCallback(async (requestPage) => {
    try {
      const response = await getImagesRequest(requestPage + 1);

      const newImages = response.hits.map((img, ind) => {
        const { id, largeImageURL } = img;
        return {
          id: `${id}-page${page}-numb${ind}`,
          largeImageURL,
        };
      });

      setImages((data) => [...data, ...newImages]);
    } catch (e) {
      showSnackbar(e.message, 'error');
    }
  }, [showSnackbar, page]);

  const handlerOnClick = () => {
    getImages(page);
    setPage(page + 1);
  };

  useEffect(() => {
    if (images.length) {
      return;
    }

    getImages(0);
  }, [getImages, images]);

  const paletteImages = images.map((image) => ({
    value: `url(${image.largeImageURL})`,
    key: image.id,
  }));

  return (
    <>
      <Palette
        data={paletteImages}
        onClick={onClick}
      />
      <Button
        color="primary"
        onClick={handlerOnClick}
      >
        Load more...
      </Button>
    </>
  );
};

ImagePalette.propTypes = {
  onClick: PropTypes.func,
};

ImagePalette.defaultProps = {
  onClick: null,
};

export default ImagePalette;
