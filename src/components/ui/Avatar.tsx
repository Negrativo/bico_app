import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../../theme';

interface AvatarProps {
  name?: string;
  source?: ImageSourcePropType;
  size?: number;
  backgroundColor?: string;
  color?: string;
}

function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({
  name,
  source,
  size = 56,
  backgroundColor = colors.primaryLight,
  color = colors.primary,
}: AvatarProps) {
  const dim = { width: size, height: size, borderRadius: size / 2 };

  if (source) {
    return <Image source={source} style={[styles.image, dim]} />;
  }

  return (
    <View style={[styles.fallback, dim, { backgroundColor }]}>
      <Text style={[styles.initials, { color, fontSize: size * 0.4 }]}>
        {getInitials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: typography.weight.bold,
  },
});
