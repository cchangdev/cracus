import { Grid } from '@chakra-ui/react'
import MediaItem from './MediaItem'

const MediaList = ({gifs, onFavoriteClick}) => {
    const renderedList = gifs.map((gif,idx) => {
        return <MediaItem gif={gif} onFavoriteClick={onFavoriteClick} key={idx} />
    })

    return (
        <Grid templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
        }}
        gap={6}
        >
            {renderedList}
        </Grid>
    )
}

export default MediaList