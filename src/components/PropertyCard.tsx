import React from "react";
import { Bed, Bath, Car } from "lucide-react";
import { Button } from "./ui/button";
import { PropertyListing } from "@/data/mockData";
import styles from "./PropertyCard.module.css";

interface PropertyCardProps {
  property: PropertyListing;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  // Accept either badgeColor (preferred) or badge text as fallback
  const getBadgeClass = (badge?: string, badgeColor?: string) => {
    const baseClass = styles.badge;

    // map of badgeColor keywords -> css classes
    const colorMap: Record<string, string> = {
      green: styles.badgeExclusive,
      blue: styles.badgeSchool,
      teal: styles.badgeRental,
      orange: styles.badgeFeatured,
    };

    if (badgeColor) {
      const key = badgeColor.toLowerCase();
      if (colorMap[key]) return `${baseClass} ${colorMap[key]}`;
    }

    if (!badge) return `${baseClass} ${styles.badgeDefault}`;

    const text = badge.toLowerCase();
    if (text.includes("exclusive")) return `${baseClass} ${styles.badgeExclusive}`;
    if (text.includes("rental") || text.includes("yield")) return `${baseClass} ${styles.badgeRental}`;
    if (text.includes("school") || text.includes("score")) return `${baseClass} ${styles.badgeSchool}`;
    if (text.includes("featured")) return `${baseClass} ${styles.badgeFeatured}`;
    if (text.includes("new") || text.includes("newly")) return `${baseClass} ${styles.badgeNewly}`;

    return `${baseClass} ${styles.badgeDefault}`;
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={property.image}
          alt={property.address || "Property image"}
          className={
            property.restricted
              ? `${styles.image} ${styles.blurredImage}`
              : styles.image
          }
        />

        {property.badge && (
          <span className={getBadgeClass(property.badge, property.badgeColor)}>
            {property.badge}
          </span>
        )}

        {property.status === "For Sale" && (
          <span className={styles.forSaleTag}>For Sale</span>
        )}

        {property.restricted && (
          <div className={styles.restrictedOverlay}>
            <Button size="sm" className="bg-primary text-white">
              Login Required
            </Button>
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.price}>Listed: ${property.price.toLocaleString()}</div>
        <div className={styles.timestamp}>{property.date}</div>
        <div className={styles.address}>{property.address}</div>
        <div className={styles.propertyType}>{property.type}</div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <Bed className={styles.featureIcon} />
            <span>{property.beds}</span>
          </div>
          <div className={styles.feature}>
            <Bath className={styles.featureIcon} />
            <span>{property.baths}</span>
          </div>
          <div className={styles.feature}>
            <Car className={styles.featureIcon} />
            <span>{property.parking}</span>
          </div>
        </div>

        {property.agent && <div className={styles.agent}>{property.agent}</div>}
      </div>
    </div>
  );
};

export default PropertyCard;
