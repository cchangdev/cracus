import {IconButton} from '@chakra-ui/react'
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const HeartButton = ({ isFavorited, onClick }) => (
    <IconButton
      icon={
        isFavorited ? (
          <FaHeart color="red" />
        ) : (
          <FaHeartBroken color="gray.500" />
        )
      }
      aria-label="Favorite"
      onClick={onClick}
    />
  );

export default HeartButton