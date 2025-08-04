import styles from "@/styles/main";
import { X } from "lucide-react-native";
import React from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ModalProps {
  headerTitle: string;
  closeModal: (Event: GestureResponderEvent) => void;
  children: React.ReactNode;
}

const Modal = ({ headerTitle, closeModal, children }: ModalProps) => {
  return (
    <View style={[styles.modal, styles.centerItems]}>
      <View style={styles.modalContent}>
        <View
          style={[
            styles.modalHeader,
            styles.w100,
            styles.flexRow,
            styles.justifyBetween,
          ]}
        >
          <Text style={[styles.h6, styles.text_success, styles.fontBold]}>
            {headerTitle}
          </Text>
          <TouchableOpacity onPress={closeModal}>
            <X size={15} color={styles.text_danger.color} />
          </TouchableOpacity>
        </View>
        <View>{children}</View>
      </View>
    </View>
  );
};

export default Modal;
