import {Button, Text, Flex, useClipboard, Box, Image, Link} from '@chakra-ui/react'
import HeartButton from './HeartButton'

const MediaItem = ({gif, onFavoriteClick}) => {
    const gifUrl = gif.url
    const source = gif.source
    const sourceUrl = gif.source_post_url
    const rating = gif.rating
    const { onCopy, hasCopied } = useClipboard(gifUrl || "");

    return (
        <Flex
            direction="column"
            overflow="hidden"
            boxShadow="md"
            border="1px"
            borderColor="gray.200"
            borderRadius="base"
            w="100%"
            >
            <Box p={2}>
                <Button alignSelf="flex-end" w="full" onClick={() => {
                    onCopy()
                }}>{hasCopied ? "Copied!" : "Copy"}</Button>
            </Box>
            <Box w="100%" overflow="hidden" position="relative">
                <Image w="100%" alt={gif.title} src={gif.thumb_url}/>
                <Box position="absolute" top="0" right="0" p={2}>
                    <HeartButton
                        isFavorited={gif.isFavorited}
                        onClick={() => onFavoriteClick(gif.id)}
                    />
                </Box>
            </Box>
            <Box p={2}>
                <Text fontWeight="bold" fontSize="lg">{gif.title}</Text>
                {source && sourceUrl && (
                    <Box fontSize="sm" mt="2">
                        Source: <Link isTruncated display="block" href={sourceUrl} isExternal>{source}</Link>
                    </Box>
                )}
                { rating && (
                    <Box fontSize="sm" mt="2">
                        <Text display="inline" mr="1">Rating:</Text>
                        <Text textTransform="uppercase" display="inline">{rating}</Text>
                    </Box>
                )}
            </Box>
        </Flex>
    )
}

export default MediaItem